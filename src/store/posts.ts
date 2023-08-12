// stores/counter.js
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
    state: () => ({ posts: new Map() }),

    actions: {
        upsertPost(post: Post): void {
            this.posts.set(post.id, post)
        },

        getPost(id: number | string): Post | null {
            return this.posts.get(id) || null
        }
    },
})

export default usePostsStore;