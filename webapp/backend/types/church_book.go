package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type ChurchBook struct {
	ID                primitive.ObjectID `bson:"_id" json:"_id"`
	CountryId         string             `bson:"country" json:"country"`
	DioceseId         string             `bson:"diocese" json:"diocese"`
	CommunityId       string             `bson:"community" json:"community"`
	ChurchBookId      string             `bson:"id" json:"id"`
	Label             string             `bson:"label" json:"label"`
	MatriculationType string             `bson:"matriculation_type" json:"matriculation_type"`
	Period            string             `bson:"period" json:"period"`
	Complete          bool               `bson:"complete" json:"complete"`
	Link              string             `bson:"link" json:"link"`
}
