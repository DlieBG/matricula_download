package services

import (
	"os"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var minioClient *minio.Client

func ConnectMinio() {
	endpoint := os.Getenv("MINIO_ENDPOINT")
	if endpoint == "" {
		panic("MINIO_ENDPOINT not available")
	}

	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	if accessKey == "" {
		panic("MINIO_ACCESS_KEY not available")
	}

	secretKey := os.Getenv("MINIO_SECRET_KEY")
	if secretKey == "" {
		panic("MINIO_SECRET_KEY not available")
	}

	var err error
	minioClient, err = minio.New(
		endpoint,
		&minio.Options{
			Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
			Secure: false,
		},
	)
	if err != nil {
		panic("Minio connection failed")
	}
}

func GetMinioClient() *minio.Client {
	return minioClient
}
