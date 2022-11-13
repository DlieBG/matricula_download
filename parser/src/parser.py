import json, re
from uuid import uuid4

from bs4 import BeautifulSoup
from matricula import Matricula

# list(filter(None, '/test/asd/123/'.split('/')))

class Parser:

    __countries: list = list()

    def __init__(self):
        self.__matricula = Matricula()
        self.__countries = self.__parse_countries()
        print(json.dumps(self.__countries, indent=4))

    def get_countries(self) -> list:
        return self.__countries

    def __parse_countries(self) -> list:
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
            element.span.decompose()

            countries.append({
                'id': str(uuid4()),
                'name': element.text.strip(),
                'link': element['href'],
                'dioceses': self.__parse_dioceses(element['href'])
            })
        
        return countries

    def __parse_dioceses(self, country_url: str) -> list:
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
            element.span.decompose()

            dioceses.append({
                'id': str(uuid4()),
                'name': element.text.strip(),
                'link': element['href'],
                'communities': self.__parse_communities(element['href'])
            })
        
        return dioceses

    def __parse_communities(self, diocese_url: str) -> list:
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

            communities.append({
                'id': str(uuid4()),
                'name': element.text.strip(),
                'link': element['href'],
                'church_books': self.__parse_church_books(element['href'])
            })
        
        return communities

    def __parse_church_books(self, community_url: str, page: int = 1) -> list:
        b_s = BeautifulSoup(
            self.__matricula.get_html(f'{community_url}?page={page}'),
            'html.parser'
        )

        elements = b_s.select(
            'div > table > tr'
        )

        church_books = list()

        for element in elements[1:]:
            if not element.attrs.get('class', None) and not element.td.a['href'].startswith('#'):
                print(community_url)
                church_books.append({
                    'id': str(uuid4()),
                    'signature': element.select('td')[1].text.strip(),
                    'matriculation_type': element.select('td')[2].text.strip(),
                    'period': element.select('td')[3].text.strip(),
                    'link': element.td.a['href'],
                    'pages': self.__parse_pages(element.td.a['href'])
                })

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
                church_books.extend(
                    self.__parse_church_books(community_url, page + 1)
                )

        return church_books

    def __parse_pages(self, church_book_url: str) -> list:
        pages = self.__matricula.get_html(f'{church_book_url}')

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

        files = json.loads(
            re.search(
                '"files": .*]',
                pages
            )[0]
            .replace(
                '"files": ',
                ''
            )
        )

        # TODO: include base url of image server

        pages = list()

        for label, link in zip(labels, files):
            pages.append({
                'id': str(uuid4()),
                'label': label,
                'link': link
            })

        return pages
