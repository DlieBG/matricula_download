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

func RegisterParserJobRoutes(app *fiber.App) {
	group := app.Group("/parser-job")

	group.Get("/", GetParserJobs)
	group.Get("/:id", GetParserJob)
	group.Post("/", CreateParserJob)
	group.Delete("/:id", DeleteParserJob)
}

func GetParserJobs(c *fiber.Ctx) error {
	collection := services.GetMongoCollection("parser_job")

	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		return err
	}

	var results []types.ParserJob
	if err = cursor.All(context.TODO(), &results); err != nil {
		return err
	}

	return c.JSON(results)
}

func GetParserJob(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return err
	}

	collection := services.GetMongoCollection("parser_job")

	var result types.ParserJob
	err = collection.FindOne(context.TODO(), bson.M{
		"_id": id,
	}).Decode(&result)
	if err != nil {
		return err
	}

	return c.JSON(result)
}

func CreateParserJob(c *fiber.Ctx) error {
	parserJob := types.CreateParserJob{
		Queued:         primitive.NewDateTimeFromTime(time.Now()),
		CountryRegex:   ".*",
		DioceseRegex:   ".*",
		CommunityRegex: ".*",
		PageSkip:       false,
	}

	if err := c.BodyParser(&parserJob); err != nil {
		return err
	}

	collection := services.GetMongoCollection("parser_job")

	result, err := collection.InsertOne(
		context.TODO(),
		parserJob,
	)
	if err != nil {
		return err
	}

	return c.JSON(result)
}

func DeleteParserJob(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return err
	}

	collection := services.GetMongoCollection("parser_job")

	result, err := collection.DeleteOne(context.TODO(), bson.M{
		"_id": id,
		"$or": bson.A{
			bson.M{
				"finished": bson.M{
					"$ne": nil,
				},
			},
			bson.M{
				"errored": bson.M{
					"$ne": nil,
				},
			},
		},
	})
	if err != nil {
		return err
	}

	return c.JSON(result)
}
