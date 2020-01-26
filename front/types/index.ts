export interface Artist {
    id: number
    name: string
    introduction: string
    songs: Song[]
    image: Image,
}


export interface Image {
    url: string
    byte_size: number
    name: string
}

export interface Vote {
    user_id: number,
    song_id: number
}

export interface Song {
    id: number
    name: string
    artist: Artist
    votes_count: number
    lyrics: string
    isVisible: boolean
    video_url: string
    votes: Vote[]
}


export interface User {
    uid?: string
}

export interface Action {
    type: string;
    uid: string;
    payload: any;
}

export interface Error {
    message: string
}