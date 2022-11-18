import os

from dotenv import find_dotenv, load_dotenv
from pymongo import MongoClient, HASHED


class Mongo:

    __client = MongoClient()

    def __init__(self):
        load_dotenv(find_dotenv())

        self.__client = MongoClient(os.getenv("MONGO_URI"))
        self.__create_indexes()

    def __create_indexes(self):
        self.__client['matricula_download']['country'].create_index([
            ('id', HASHED)
        ], name="country_index")

        self.__client['matricula_download']['diocese'].create_index([
            ('id', HASHED),
            ('country', 1)
        ], name="diocese_index")

        self.__client['matricula_download']['community'].create_index([
            ('id', HASHED),
            ('country', 1),
            ('diocese', 1)
        ], name="community_index")

        self.__client['matricula_download']['church_book'].create_index([
            ('id', HASHED),
            ('country', 1),
            ('diocese', 1),
            ('community', 1)
        ], name="church_book_index")

        self.__client['matricula_download']['page'].create_index([
            ('id', HASHED),
            ('country', 1),
            ('diocese', 1),
            ('community', 1),
            ('church_book', 1)
        ], name="page_index")

    def upsert_country(self, country):
        self.__client['matricula_download']['country'].update_one(
                {
                    'id': country['id']
                },
                {
                    '$set': country
                },
                upsert=True
            )

    def upsert_diocese(self, diocese):
        self.__client['matricula_download']['diocese'].update_one(
                {
                    'id': diocese['id'],
                    'country': diocese['country']
                },
                {
                    '$set': diocese
                },
                upsert=True
            )

    def upsert_community(self, community):
        self.__client['matricula_download']['community'].update_one(
                {
                    'id': community['id'],
                    'country': community['country'],
                    'diocese': community['diocese']
                },
                {
                    '$set': community
                },
                upsert=True
            )

    def upsert_church_book(self, church_book):
        self.__client['matricula_download']['church_book'].update_one(
                {
                    'id': church_book['id'],
                    'country': church_book['country'],
                    'diocese': church_book['diocese'],
                    'community': church_book['community']
                },
                {
                    '$set': church_book
                },
                upsert=True
            )

    def upsert_page(self, page):
        self.__client['matricula_download']['page'].update_one(
                {
                    'id': page['id'],
                    'country': page['country'],
                    'diocese': page['diocese'],
                    'community': page['community'],
                    'church_book': page['church_book']
                },
                {
                    '$set': page
                },
                upsert=True
            )
