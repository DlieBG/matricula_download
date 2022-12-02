package controllers

import (
	"context"

	"benedikt-schwering.de/matricula_download/v2/services"
	"benedikt-schwering.de/matricula_download/v2/types"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func RegisterCountryRoutes(app *fiber.App) {
	group := app.Group("/country")

	group.Get("/", GetCountries)
	group.Get("/:countryId", GetCountry)
}

func GetCountries(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("country")

	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		return err
	}

	var results []types.Country
	if err = cursor.All(context.TODO(), &results); err != nil {
		return nil
	}

	return c.JSON(results)
}

func GetCountry(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("country")

	var result types.Country
	if err := collection.FindOne(context.TODO(), bson.M{
		"id": c.Params("countryId"),
	}).Decode(&result); err != nil {
		return err
	}

	return c.JSON(result)
}
