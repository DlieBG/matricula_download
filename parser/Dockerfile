FROM python:3.10

WORKDIR /app/parser

COPY requirements.txt .
RUN pip3 install -r requirements.txt

WORKDIR /app/parser/src

COPY src/main.py .
COPY src/parser.py .
COPY src/matricula.py .
COPY src/mongo.py .

CMD [ "python3", "-u", "main.py" ]
