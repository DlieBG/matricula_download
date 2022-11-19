import requests


class Matricula:

    __base_url = 'https://data.matricula-online.eu'
    __counter = 0

    def get_html(self, relative_url: str) -> str:
        self.__counter += 1
        print(self.__counter)

        return requests.get(f'{self.__base_url}{relative_url}', timeout=5).text
