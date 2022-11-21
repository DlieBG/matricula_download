import os

from dotenv import find_dotenv, load_dotenv
from minio import Minio


class S3:

    __bucket = 'matricula-download'

    def __init__(self):
        load_dotenv(find_dotenv())

        self.__client = Minio(
            endpoint=os.getenv('MINIO_ENDPOINT'),
            access_key=os.getenv('MINIO_ACCESS_KEY'),
            secret_key=os.getenv('MINIO_SECRET_KEY'),
            secure=False
        )

        self.__create_bucket()

    def __create_bucket(self):
        if not self.__client.bucket_exists(self.__bucket):
            self.__client.make_bucket(self.__bucket)

    def upload_file(self, object_name: str, file_path: str, content_type: str):
        self.__client.fput_object(
            self.__bucket,
            f'{object_name}.jpg',
            file_path,
            content_type
        )
