package controllers

import (
	"context"

	"benedikt-schwering.de/matricula_download/v2/services"
	"benedikt-schwering.de/matricula_download/v2/types"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RegisterListDownloaderRoutes(app *fiber.App) {
	group := app.Group("/list-downloader")

	group.Get("/", GetLists)
	group.Get("/:id", GetList)
	group.Post("/", CreateList)
	group.Put("/:id", UpdateList)
	group.Delete("/:id", DeleteList)
}

func GetLists(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("list_downloader")

	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		return err
	}

	var results []types.ListDownloader
	if err = cursor.All(context.TODO(), &results); err != nil {
		return err
	}

	return c.JSON(results)
}

func GetList(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return err
	}

	collection := services.GetMongoCollection("list_downloader")

	var result types.ListDownloader
	err = collection.FindOne(
		context.TODO(),
		bson.M{
			"_id": id,
		},
	).Decode(&result)
	if err != nil {
		return err
	}

	return c.JSON(result)
}

func CreateList(c *fiber.Ctx) error {
	list := types.CreateListDownloader{
		Name:  "Neue Liste",
		Pages: make([]types.ListDownloaderPage, 0),
	}

	if err := c.BodyParser(&list); err != nil {
		return err
	}

	collection := services.GetMongoCollection("list_downloader")

	result, err := collection.InsertOne(
		context.TODO(),
		list,
	)
	if err != nil {
		return err
	}

	return c.JSON(result)
}

func UpdateList(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return err
	}

	var list types.ListDownloader
	if err := c.BodyParser(&list); err != nil {
		return err
	}

	collection := services.GetMongoCollection("list_downloader")

	result, err := collection.UpdateOne(
		context.TODO(),
		bson.M{
			"_id": id,
		},
		bson.M{
			"$set": list,
		},
	)
	if err != nil {
		return err
	}

	return c.JSON(result)
}

func DeleteList(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return err
	}

	collection := services.GetMongoCollection("list_downloader")

	result, err := collection.DeleteOne(
		context.TODO(),
		bson.M{
			"_id": id,
		},
	)
	if err != nil {
		return err
	}

	return c.JSON(result)
}
