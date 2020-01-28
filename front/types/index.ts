export interface Post {
    id: number
    body: string
    user?: User
    userId?: number
}

export interface User {
    id: number,
    uid: string
    name: string
    posts: Post[]
}

export interface Action {
    type: string;
    uid: string;
    payload: any;
}

export interface Error {
    message: string
}