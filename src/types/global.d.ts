export { }

declare global {
    export interface Post {
        id: number;
        userId: number;
        title: string;
        body: string;
    }

    export interface User {
        id: number;
        name: string;
        username: string;
        email: string;
    }
}
