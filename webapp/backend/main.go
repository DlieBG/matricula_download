package main

import (
	"benedikt-schwering.de/matricula_download/v2/controllers"
	"benedikt-schwering.de/matricula_download/v2/services"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		panic("No .env found")
	}

	services.ConnectMongo()
	defer services.DisconnectMongo()

	services.ConnectMinio()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	controllers.RegisterParserJobRoutes(app)
	controllers.RegisterCountryRoutes(app)
	controllers.RegisterDioceseRoutes(app)
	controllers.RegisterCommunityRoutes(app)
	controllers.RegisterChurchBookRoutes(app)
	controllers.RegisterPageRoutes(app)
	controllers.RegisterListDownloaderRoutes(app)

	app.Listen(":8060")
}
