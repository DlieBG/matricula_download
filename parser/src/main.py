import time

from parser import Parser
from mongo import Mongo


mongo = Mongo()

while True:
    try:
        job = mongo.get_job()
        
        if job:
            mongo.start_job(job['_id'])
            
            print('Start job', job['_id'])

            Parser(
                country_regex=job.get('country_regex', '.*'),
                diocese_regex=job.get('diocese_regex', '.*'),
                community_regex=job.get('community_regex', '.*')
            )

            mongo.finish_job(job['_id'])
        else:
            time.sleep(30)
    except Exception as e:
        print(e)
        break

mongo.close()
