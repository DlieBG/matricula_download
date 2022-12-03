package controllers

import (
	"context"
	"time"

	"benedikt-schwering.de/matricula_download/v2/services"
	"benedikt-schwering.de/matricula_download/v2/types"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RegisterChurchBookRoutes(app *fiber.App) {
	group := app.Group("/church-book")

	group.Get("/:countryId/:dioceseId/:communityId", GetChurchBooks)
	group.Get("/:countryId/:dioceseId/:communityId/:churchBookId", GetChurchBook)
	group.Patch("/:countryId/:dioceseId/:communityId/:churchBookId", QueueChurchBookDownload)
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

func QueueChurchBookDownload(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("page")

	result, err := collection.UpdateMany(context.TODO(), bson.M{
		"country":     c.Params("countryId"),
		"diocese":     c.Params("dioceseId"),
		"community":   c.Params("communityId"),
		"church_book": c.Params("churchBookId"),
		"$or": bson.A{
			bson.M{
				"s3.queued": bson.M{
					"$eq": nil,
				},
			},
			bson.M{
				"s3.errored": bson.M{
					"$ne": nil,
				},
			},
			bson.M{
				"s3.finished": bson.M{
					"$ne": nil,
				},
			},
		},
	}, bson.M{
		"$set": bson.M{
			"s3": bson.M{
				"queued":   primitive.NewDateTimeFromTime(time.Now()),
				"started":  nil,
				"finished": nil,
				"errored":  nil,
				"error":    nil,
			},
		},
	})
	if err != nil {
		return err
	}

	return c.JSON(result)
}
