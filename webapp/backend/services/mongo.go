package services

import (
	"context"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client

func ConnectMongo() {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		panic("MONGO_URI not available")
	}

	var err error
	mongoClient, err = mongo.Connect(
		context.TODO(),
		options.Client().ApplyURI(uri),
	)
	if err != nil {
		panic("Mongo connection failed")
	}
}

func DisconnectMongo() {
	mongoClient.Disconnect(context.TODO())
}

func GetMongoClient() *mongo.Client {
	return mongoClient
}

func GetMongoCollection(collection string) *mongo.Collection {
	return mongoClient.Database("matricula_download").Collection(collection)
}
