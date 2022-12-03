export interface Page {
    country: string
    diocese: string
    community: string
    church_book: string
    id: string
    label: string
    link: string
    img: string
    comment: string
    s3: S3
}

export interface S3 {
    queued: Date | null
    started: Date | null
    finished: Date | null
    errored: Date | null
    error: string | null
    presigned_url: string | null
}
