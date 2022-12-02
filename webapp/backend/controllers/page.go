package controllers

import (
	"context"
	"fmt"
	"time"

	"benedikt-schwering.de/matricula_download/v2/services"
	"benedikt-schwering.de/matricula_download/v2/types"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RegisterPageRoutes(app *fiber.App) {
	group := app.Group("/page")

	group.Get("/:countryId/:dioceseId/:communityId/:churchBookId", GetPages)
	group.Get("/:countryId/:dioceseId/:communityId/:churchBookId/:pageId", GetPage)
	group.Patch("/:countryId/:dioceseId/:communityId/:churchBookId/:pageId", QueuePageDownload)
}

func GetPages(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("page")

	cursor, err := collection.Find(context.TODO(), bson.M{
		"country":     c.Params("countryId"),
		"diocese":     c.Params("dioceseId"),
		"community":   c.Params("communityId"),
		"church_book": c.Params("churchBookId"),
	})
	if err != nil {
		return err
	}

	var results []types.Page
	if err = cursor.All(context.TODO(), &results); err != nil {
		return nil
	}

	return c.JSON(results)
}

func GetPage(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("page")

	var result types.Page
	if err := collection.FindOne(context.TODO(), bson.M{
		"country":     c.Params("countryId"),
		"diocese":     c.Params("dioceseId"),
		"community":   c.Params("communityId"),
		"church_book": c.Params("churchBookId"),
		"id":          c.Params("pageId"),
	}).Decode(&result); err != nil {
		return err
	}

	if result.S3.Finished != 0 {
		presignedUrl, err := services.GetMinioClient().PresignedGetObject(
			context.TODO(),
			"matricula-download",
			fmt.Sprintf("%s/%s/%s/%s/%s.jpg", result.CountryId, result.DioceseId, result.CommunityId, result.ChurchBookId, result.PageId),
			20*time.Minute,
			nil,
		)
		if err != nil {
			return err
		}

		result.S3.PresignedUrl = fmt.Sprint(presignedUrl)
	}

	return c.JSON(result)
}

func QueuePageDownload(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("page")

	result, err := collection.UpdateOne(context.TODO(), bson.M{
		"country":     c.Params("countryId"),
		"diocese":     c.Params("dioceseId"),
		"community":   c.Params("communityId"),
		"church_book": c.Params("churchBookId"),
		"id":          c.Params("pageId"),
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
