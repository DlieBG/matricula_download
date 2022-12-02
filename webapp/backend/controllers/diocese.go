package controllers

import (
	"context"

	"benedikt-schwering.de/matricula_download/v2/services"
	"benedikt-schwering.de/matricula_download/v2/types"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func RegisterDioceseRoutes(app *fiber.App) {
	group := app.Group("/diocese")

	group.Get("/:countryId", GetDioceses)
	group.Get("/:countryId/:dioceseId", GetDiocese)
}

func GetDioceses(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("diocese")

	cursor, err := collection.Find(context.TODO(), bson.M{
		"country": c.Params("countryId"),
	})
	if err != nil {
		return err
	}

	var results []types.Diocese
	if err = cursor.All(context.TODO(), &results); err != nil {
		return nil
	}

	return c.JSON(results)
}

func GetDiocese(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("diocese")

	var result types.Diocese
	if err := collection.FindOne(context.TODO(), bson.M{
		"country": c.Params("countryId"),
		"id":      c.Params("dioceseId"),
	}).Decode(&result); err != nil {
		return err
	}

	return c.JSON(result)
}
