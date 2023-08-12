<template>
    <div class="user">
        <VLoader v-if="isLoading" />
        <template v-else-if="user">
            <div class="initials-avatar">{{ initials }}</div>
            <div class="name">{{ userName }}</div>
        </template>
        <div v-else class="action">
            <button class="small-retry" @click="fetchUser">Try again</button>
        </div>
    </div>
    
</template>
  
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { getUser } from '../services/users-service'
import useUsersStore from '../store/users'
import VLoader from './VLoader.vue'

export default defineComponent({
    name: 'VUser',
    emits: ['retry'],
    props: {
        userId: {
            type: Number,
            required: true,
        }
    },
    components: {
        VLoader,
    },
    setup(props) {
        const user = ref(null as User | null)
        const isLoading = ref(false)
        const users = useUsersStore()

        const initials = computed(() => {
            if (!user.value) return ''
            return user.value.name.split(' ').map(n => n[0]).slice(0, 2).join('')
        })

        const userName = computed(() => {
            if (!user.value) return ''
            return user.value.name
        })

        const fetchCurrentuserFromCache = () => {
            const cacheduser = users.getUser(props.userId)
            user.value = cacheduser
        }

        const fetchUser = async () => {
            fetchCurrentuserFromCache()
            if (user.value) return

            isLoading.value = true
            user.value = await getUser(props.userId)
            if (user.value) {
                users.upsertUser(user.value)
            }
            isLoading.value = false
        }

        onMounted(() => {
            fetchUser()
        })

        watch(() => props.userId, () => {
            fetchUser()
        })

        return {
            initials,
            userName,
            user,
            fetchUser,
            isLoading,
        }
    }
})
</script>

<style scoped>
.user {
    display: flex;
    justify-content: start;
    align-items: center;
}

.user > .name {
    font-size: 1rem;
    margin-left: 16px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.5);
}

.user > .initials-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
}
</style>