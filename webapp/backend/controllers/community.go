package controllers

import (
	"context"

	"benedikt-schwering.de/matricula_download/v2/services"
	"benedikt-schwering.de/matricula_download/v2/types"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func RegisterCommunityRoutes(app *fiber.App) {
	group := app.Group("/community")

	group.Get("/:countryId/:dioceseId", GetCommunities)
	group.Get("/:countryId/:dioceseId/:communityId", GetCommunity)
}

func GetCommunities(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("community")

	cursor, err := collection.Find(context.TODO(), bson.M{
		"country": c.Params("countryId"),
		"diocese": c.Params("dioceseId"),
	})
	if err != nil {
		return err
	}

	var results []types.Community
	if err = cursor.All(context.TODO(), &results); err != nil {
		return nil
	}

	return c.JSON(results)
}

func GetCommunity(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("community")

	var result types.Community
	if err := collection.FindOne(context.TODO(), bson.M{
		"country": c.Params("countryId"),
		"diocese": c.Params("dioceseId"),
		"id":      c.Params("communityId"),
	}).Decode(&result); err != nil {
		return err
	}

	return c.JSON(result)
}
