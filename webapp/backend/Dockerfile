FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./
COPY controllers controllers
COPY services services
COPY types types

RUN go build .

EXPOSE 8060

CMD [ "./matricula_download" ]
