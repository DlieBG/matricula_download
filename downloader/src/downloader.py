import json, requests, shutil, os

from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
from s3 import S3


class Downloader:

    __base_url = 'https://data.matricula-online.eu'

    def __init__(self,
        country_id: str,
        diocese_id: str,
        community_id: str,
        church_book_id: str,
        page_id: str,
        link: str,
    ):
        full_link, content_type = self.__get_full_link(link)
    
        self.__download_page(full_link)

        self.__upload_page(country_id, diocese_id, community_id, church_book_id, page_id, content_type)

        self.__delete_tmp()

    def __get_full_link(self, link: str) -> tuple:
        options = Options()
        options.headless = True

        capabilities = DesiredCapabilities.CHROME
        capabilities["goog:loggingPrefs"] = {"performance": "ALL"}

        driver = webdriver.Chrome(options=options, desired_capabilities=capabilities)
        driver.get(f'{self.__base_url}{link}')

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '/html/body/div/div[2]/div[1]/div[3]/div/canvas'))
        )

        logs = driver.get_log('performance')

        driver.quit()

        for line in logs:
            full_link = json.loads(line['message'])['message']['params'].get('response', {}).get('url', None)
            content_type = json.loads(line['message'])['message']['params'].get('response', {}).get('headers', {}).get('Content-Type')
            
            if full_link and content_type and 'ctrl=' in full_link:
                return full_link, content_type

    def __download_page(self, full_link: str):
        csrf = full_link.split('csrf=')[1].split('&ctrl=')[0]

        img = requests.get(full_link, stream=True, cookies={
            'shared_csrftoken': csrf
        })

        with open('tmp/download', 'wb') as f:
            shutil.copyfileobj(img.raw, f)

    def __upload_page(self, country_id: str, diocese_id: str, community_id: str, church_book_id: str, page_id: str, content_type: str):
        s3 = S3()
        s3.upload_file(
            f'{country_id}/{diocese_id}/{community_id}/{church_book_id}/{page_id}',
            'tmp/download',
            content_type
        )

    def __delete_tmp(self):
        os.remove('tmp/download')
