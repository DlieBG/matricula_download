export interface ParserJob {
    _id: string
    queued: Date | null
    started: Date | null
    finished: Date | null
    errored: Date | null
    error: string | null
    country_regex: string
    diocese_regex: string
    community_regex: string
    page_skip: boolean
}

export interface CreateParserJob {
    country_regex: string
    diocese_regex: string
    community_regex: string
    page_skip: boolean
}
