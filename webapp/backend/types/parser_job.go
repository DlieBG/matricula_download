package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type ParserJob struct {
	ID             primitive.ObjectID `bson:"_id" json:"_id"`
	Queued         primitive.DateTime `bson:"queued" json:"queued,omitempty"`
	Started        primitive.DateTime `bson:"started" json:"started,omitempty"`
	Finished       primitive.DateTime `bson:"finished" json:"finished,omitempty"`
	Errored        primitive.DateTime `bson:"errored" json:"errored,omitempty"`
	Error          string             `bson:"error" json:"error,omitempty"`
	CountryRegex   string             `bson:"country_regex" json:"country_regex"`
	DioceseRegex   string             `bson:"diocese_regex" json:"diocese_regex"`
	CommunityRegex string             `bson:"community_regex" json:"community_regex"`
	PageSkip       bool               `bson:"page_skip" json:"page_skip"`
}

type CreateParserJob struct {
	Queued         primitive.DateTime `bson:"queued" json:"queued"`
	CountryRegex   string             `bson:"country_regex" json:"country_regex"`
	DioceseRegex   string             `bson:"diocese_regex" json:"diocese_regex"`
	CommunityRegex string             `bson:"community_regex" json:"community_regex"`
	PageSkip       bool               `bson:"page_skip" json:"page_skip"`
}
