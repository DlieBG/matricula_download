import requests

class Matricula:

    __base_url = 'https://data.matricula-online.eu'
    __counter = 0

    def __init__(self):
        self.session = requests.session()

    def get_html(self, relative_url: str) -> str:
        self.__counter += 1
        print(self.__counter)

        return self.session.get(f'{self.__base_url}{relative_url}').text

    # def get_csrf_link(self, url) -> str:
    #     return f'{url}'
