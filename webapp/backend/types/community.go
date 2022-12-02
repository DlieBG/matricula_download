package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type Community struct {
	ID          primitive.ObjectID `bson:"_id" json:"_id"`
	CountryId   string             `bson:"country" json:"country"`
	DioceseId   string             `bson:"diocese" json:"diocese"`
	CommunityId string             `bson:"id" json:"id"`
	Name        string             `bson:"name" json:"name"`
	Link        string             `bson:"link" json:"link"`
}
