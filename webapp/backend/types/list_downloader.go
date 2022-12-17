package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type ListDownloader struct {
	ID    primitive.ObjectID   `bson:"_id" json:"_id"`
	Name  string               `bson:"name" json:"name"`
	Pages []ListDownloaderPage `bson:"pages" json:"pages"`
}

type ListDownloaderPage struct {
	CountryId    string `bson:"country" json:"country"`
	DioceseId    string `bson:"diocese" json:"diocese"`
	CommunityId  string `bson:"community" json:"community"`
	ChurchBookId string `bson:"church_book" json:"church_book"`
	PageId       string `bson:"page" json:"page"`
	FileName     string `bson:"file_name" json:"file_name"`
}

type CreateListDownloader struct {
	Name  string               `bson:"name" json:"name"`
	Pages []ListDownloaderPage `bson:"pages" json:"pages"`
}
