import time, traceback

from downloader import Downloader
from mongo import Mongo


mongo = Mongo()

while True:
    job = mongo.get_page_download()

    try:
        if job:
            mongo.start_page_download(job['_id'])
            
            print('Start page download', job['_id'])

            Downloader(
                country_id=job['country'],
                diocese_id=job['diocese'],
                community_id=job['community'],
                church_book_id=job['church_book'],
                page_id=job['id'],
                link=job['link']
            )

            mongo.finish_page_download(job['_id'])
        else:
            time.sleep(30)
    except Exception:
        mongo.error_page_download(job['_id'], traceback.format_exc())
        break

mongo.close()
