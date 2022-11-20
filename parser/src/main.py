import time, traceback

from parser import Parser
from mongo import Mongo


mongo = Mongo()

while True:
    job = mongo.get_job()

    try:
        if job:
            mongo.start_job(job['_id'])
            
            print('Start job', job['_id'])

            Parser(
                country_regex=job.get('country_regex', '.*'),
                diocese_regex=job.get('diocese_regex', '.*'),
                community_regex=job.get('community_regex', '.*'),
                page_skip=job.get('page_skip', False)
            )

            mongo.finish_job(job['_id'])
        else:
            time.sleep(30)
    except Exception:
        mongo.error_job(job['_id'], traceback.format_exc())
        break

mongo.close()
