import json, re

from bs4 import BeautifulSoup
from matricula import Matricula
from mongo import Mongo


class Parser:

    def __init__(self,
        country_regex: str,
        diocese_regex: str,
        community_regex: str,
        page_skip: bool
    ):
        self.__country_regex = country_regex
        self.__diocese_regex = diocese_regex
        self.__community_regex = community_regex
        self.__page_skip = page_skip

        self.__matricula = Matricula()
        self.__mongo = Mongo()

        self.__parse_countries()
        
        self.__mongo.close()

    def __parse_countries(self):
        b_s = BeautifulSoup(
            self.__matricula.get_html('/de/bestande'),
            'html.parser'
        )

        elements = b_s.find_all(
            'a',
            attrs={
                'class': 'list-group-item list-group-item-info list-group-item-action'
            }
        )

        countries = list()

        for element in elements:
            count = int(element.span.text)
            element.span.decompose()

            country = {
                'id': list(filter(None, element['href'].split('/')))[1],
                'name': element.text.strip(),
                'community_count': count,
                'link': element['href']
            }

            countries.append(country)
            self.__mongo.upsert_country(country)

        for country in countries:
            match = re.search(
                self.__country_regex,
                country['id']
            )

            if match[0] if match else None is country['id']:
                print('Match country', country['name'])
                self.__parse_dioceses(country['link'])

    def __parse_dioceses(self, country_url: str):
        b_s = BeautifulSoup(
            self.__matricula.get_html(country_url),
            'html.parser'
        )

        elements = b_s.find_all(
            'a',
            attrs={
                'class': 'list-group-item list-group-item-info list-group-item-action'
            }
        )

        dioceses = list()

        for element in elements:
            count = int(element.span.text)
            element.span.decompose()

            diocese = {
                'id': list(filter(None, element['href'].split('/')))[2],
                'country': list(filter(None, element['href'].split('/')))[1],
                'name': element.text.strip(),
                'community_count': count,
                'link': element['href']
            }

            dioceses.append(diocese)
            self.__mongo.upsert_diocese(diocese)

        for diocese in dioceses:
            match = re.search(
                self.__diocese_regex,
                diocese['id']
            )

            if match[0] if match else None is diocese['id']:
                print('Match diocese', diocese['name'])
                self.__parse_communities(diocese['link'])

    def __parse_communities(self, diocese_url: str):
        b_s = BeautifulSoup(
            self.__matricula.get_html(diocese_url),
            'html.parser'
        )

        elements = b_s.find_all(
            'a',
            attrs={
                'class': 'list-group-item list-group-item-info list-group-item-action'
            }
        )

        communities = list()

        for element in elements:
            element.span.decompose()

            community = {
                'id': list(filter(None, element['href'].split('/')))[3],
                'country': list(filter(None, element['href'].split('/')))[1],
                'diocese': list(filter(None, element['href'].split('/')))[2],
                'name': element.text.strip(),
                'link': element['href']
            }

            communities.append(community)
            self.__mongo.upsert_community(community)

        for community in communities:
            match = re.search(
                self.__community_regex,
                community['id']
            )

            if match[0] if match else None is community['id']:
                print('Match community', community['name'])
                self.__parse_church_books(community['link'])

    def __parse_church_books(self, community_url: str, page: int = 1):
        b_s = BeautifulSoup(
            self.__matricula.get_html(f'{community_url}?page={page}'),
            'html.parser'
        )

        elements = b_s.select(
            'div > table > tr'
        )

        church_books = list()

        for element in elements[1:]:
            if not element.attrs.get('class', None) and not element.td.a['href'].startswith(('#', 'http://', 'https://')):
                church_book = {
                    'id': list(filter(None, element.td.a['href'].split('/')))[4],
                    'country': list(filter(None, element.td.a['href'].split('/')))[1],
                    'diocese': list(filter(None, element.td.a['href'].split('/')))[2],
                    'community': list(filter(None, element.td.a['href'].split('/')))[3],
                    'label': element.select('td')[1].text.strip(),
                    'matriculation_type': element.select('td')[2].text.strip(),
                    'period': element.select('td')[3].text.strip(),
                    'complete': True if element.td.button else False,
                    'link': element.td.a['href']
                }

                church_books.append(church_book)
                self.__mongo.upsert_church_book(church_book)

        for church_book in church_books:
            if not self.__page_skip:
                self.__parse_pages(church_book['link'])

        paginator = b_s.find(
            'ul',
            attrs={
                'class': 'pagination justify-content-center flex-wrap'
            }
        )

        if paginator:
            last = paginator.select(
                'li',
                attrs={
                    'class': 'page-link'
                }
            )[-1]

            if 'fa-chevron-right' in last.span.attrs['class']:
                self.__parse_church_books(community_url, page + 1)

    def __parse_pages(self, church_book_url: str):
        pages = self.__matricula.get_html(f'{church_book_url}')

        try:
            labels = json.loads(
                re.search(
                    '"labels": .*]',
                    pages
                )[0]
                .replace(
                    '"labels": ',
                    ''
                )
            )

            links = json.loads(
                re.search(
                    '"files": .*]',
                    pages
                )[0]
                .replace(
                    '"files": ',
                    ''
                )
            )

            base_url = re.search(
                '"path": .*"',
                pages
            )[0].replace(
                '"path": "',
                ''
            ).replace(
                '"',
                ''
            )
        except:
            labels = list()
            links = list()
            base_url = ''

        pages = list()

        for count, (label, link) in enumerate(zip(labels, links), start=1):
            page = {
                'id': label,
                'country': list(filter(None, church_book_url.split('/')))[1],
                'diocese': list(filter(None, church_book_url.split('/')))[2],
                'community': list(filter(None, church_book_url.split('/')))[3],
                'church_book': list(filter(None, church_book_url.split('/')))[4],
                'label': label,
                'link': f'{church_book_url}?pg={count}',
                'img': f'{base_url}{link}',
            }

            pages.append(page)
            self.__mongo.upsert_page(page)
