package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type Country struct {
	ID             primitive.ObjectID `bson:"_id" json:"_id"`
	CountryId      string             `bson:"id" json:"id"`
	Name           string             `bson:"name" json:"name"`
	CommunityCount int                `bson:"community_count" json:"community_count"`
	Link           string             `bson:"link" json:"link"`
}
