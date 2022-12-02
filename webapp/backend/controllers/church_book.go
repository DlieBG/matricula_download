package controllers

import (
	"context"

	"benedikt-schwering.de/matricula_download/v2/services"
	"benedikt-schwering.de/matricula_download/v2/types"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func RegisterChurchBookRoutes(app *fiber.App) {
	group := app.Group("/church-book")

	group.Get("/:countryId/:dioceseId/:communityId", GetChurchBooks)
	group.Get("/:countryId/:dioceseId/:communityId/:churchBookId", GetChurchBook)
}

func GetChurchBooks(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("church_book")

	cursor, err := collection.Find(context.TODO(), bson.M{
		"country":   c.Params("countryId"),
		"diocese":   c.Params("dioceseId"),
		"community": c.Params("communityId"),
	})
	if err != nil {
		return err
	}

	var results []types.ChurchBook
	if err = cursor.All(context.TODO(), &results); err != nil {
		return nil
	}

	return c.JSON(results)
}

func GetChurchBook(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("church_book")

	var result types.ChurchBook
	if err := collection.FindOne(context.TODO(), bson.M{
		"country":   c.Params("countryId"),
		"diocese":   c.Params("dioceseId"),
		"community": c.Params("communityId"),
		"id":        c.Params("churchBookId"),
	}).Decode(&result); err != nil {
		return err
	}

	return c.JSON(result)
}
