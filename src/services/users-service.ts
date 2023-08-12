import axios from 'axios'

export async function getUser(userId: number | string): Promise<User | null> {
    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        return data
    } catch (error) {
        console.error(error)
    }

    return null;
}

export default {
    getUser,
}
