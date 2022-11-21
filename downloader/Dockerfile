FROM selenium/standalone-chrome-debug

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Berlin

RUN sudo apt update
RUN sudo apt upgrade -y

RUN sudo apt install -y python3 python3-pip

WORKDIR /app/downloader

COPY requirements.txt .
RUN pip3 install -r requirements.txt

WORKDIR /app/downloader/src

RUN sudo mkdir tmp
RUN sudo chmod 777 tmp

COPY src/main.py .
COPY src/downloader.py .
COPY src/mongo.py .
COPY src/s3.py .

CMD [ "python3", "-u", "main.py" ]
