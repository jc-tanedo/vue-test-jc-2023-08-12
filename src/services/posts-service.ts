import axios from 'axios'

export async function getPost(postId: number | string): Promise<Post | null> {
    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        return data as Post
    } catch (error) {
        console.error(error)
    }

    return null;
}

export default {
    getPost,
}
