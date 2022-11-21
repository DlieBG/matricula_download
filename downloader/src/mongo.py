import os, datetime

from dotenv import find_dotenv, load_dotenv
from pymongo import MongoClient, HASHED
from bson import ObjectId


class Mongo:

    def __init__(self):
        load_dotenv(find_dotenv())

        self.__client = MongoClient(os.getenv("MONGO_URI"))

    def close(self):
        self.__client.close()

    def get_page_download(self):
        return self.__client['matricula_download']['page'].find_one(
            {
                's3.queued': { '$ne': None },
                's3.started': None,
                's3.finished': None
            },
            sort=[('queued', 1)]
        )

    def start_page_download(self, _id: ObjectId):
        self.__client['matricula_download']['page'].update_one(
            {
                '_id': _id
            },
            {
                '$set': {
                    's3.started': datetime.datetime.now(),
                    's3.finished': None,
                    's3.errored': None,
                    's3.error': None
                }
            }
        )

    def finish_page_download(self, _id: ObjectId):
        self.__client['matricula_download']['page'].update_one(
            {
                '_id': _id
            },
            {
                '$set': {
                    's3.finished': datetime.datetime.now(),
                    's3.errored': None,
                    's3.error': None
                }
            }
        )

    def error_page_download(self, _id: ObjectId, exception: str):
        self.__client['matricula_download']['page'].update_one(
            {
                '_id': _id
            },
            {
                '$set': {
                    's3.finished': None,
                    's3.errored': datetime.datetime.now(),
                    's3.error': exception
                }
            }
        )
