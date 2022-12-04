package types

import "go.mongodb.org/mongo-driver/bson/primitive"

type Page struct {
	ID           primitive.ObjectID `bson:"_id" json:"_id"`
	CountryId    string             `bson:"country" json:"country"`
	DioceseId    string             `bson:"diocese" json:"diocese"`
	CommunityId  string             `bson:"community" json:"community"`
	ChurchBookId string             `bson:"church_book" json:"church_book"`
	PageId       string             `bson:"id" json:"id"`
	Label        string             `bson:"label" json:"label"`
	Link         string             `bson:"link" json:"link"`
	Image        string             `bson:"img" json:"img"`
	Comment      string             `bson:"comment" json:"comment"`
	S3           S3                 `bson:"s3" json:"s3"`
}

type S3 struct {
	Queued       primitive.DateTime `bson:"queued" json:"queued,omitempty"`
	Started      primitive.DateTime `bson:"started" json:"started,omitempty"`
	Finished     primitive.DateTime `bson:"finished" json:"finished,omitempty"`
	Errored      primitive.DateTime `bson:"errored" json:"errored,omitempty"`
	Error        string             `bson:"error" json:"error,omitempty"`
	PresignedUrl string             `json:"presigned_url,omitempty"`
}
