export interface ListDownloader {
    _id: string
    name: string
    pages: ListDownloaderPage[]
}

export interface ListDownloaderPage {
    country: string
    diocese: string
    community: string
    church_book: string
    page: string
    file_name: string
}

export interface CreateListDownloader {
    name: string
}

export interface StateFinished {
    _id: string,
    finished: boolean
}
