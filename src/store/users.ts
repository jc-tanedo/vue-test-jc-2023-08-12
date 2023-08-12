// stores/counter.js
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => ({ users: new Map() }),

    actions: {
        upsertUser(user: User): void {
            this.users.set(user.id, user)
        },

        getUser(id: number | string): User | null {
            return this.users.get(id) || null
        }
    },
})

export default useUsersStore;
