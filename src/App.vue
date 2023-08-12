<template>
  <div id="app">
    <div class="main-wrapper">
      <div class="container">
        <VLoader v-if="isLoading" />
        <VPost v-else-if="post" :post="post" />
        <VNoPost v-else :post-id="currentPostId" @retry="fetchCurrentPost" />
      </div>

      <div class="actions">
        <button :disabled="isLoading" @click="prevPost">Previous Post</button>
        <button :disabled="isLoading" @click="nextPost">Next Post</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import VPost from './components/VPost.vue'
import VNoPost from './components/VNoPost.vue'
import VLoader from './components/VLoader.vue'

import { getPost } from './services/posts-service'

import usePostsStore from './store/posts'

import './main.css'

export default defineComponent({
  name: 'App',
  components: {
    VPost,
    VNoPost,
    VLoader,
  },
  setup() {
    const post = ref(null as Post | null)
    const currentPostId = ref(1)
    const isLoading = ref(false)

    const posts = usePostsStore()

    const fetchCurrentPostFromCache = () => {
      const cachedPost = posts.getPost(currentPostId.value)
      post.value = cachedPost
    }

    const fetchCurrentPost = async () => {
      fetchCurrentPostFromCache()
      if (post.value) return;

      isLoading.value = true
      post.value = await getPost(currentPostId.value)
      if (post.value) {
        posts.upsertPost(post.value)
      }
      isLoading.value = false
    }

    const prevPost = () => {
      if (currentPostId.value > 1) {
        currentPostId.value--
        fetchCurrentPost();
      }
    }

    const nextPost = () => {
      currentPostId.value++
      fetchCurrentPost();
    }

    onMounted(() => {
      fetchCurrentPost()
    })

    return {
      post,
      currentPostId,
      fetchCurrentPost,
      prevPost,
      nextPost,
      isLoading,
    }
  }
})
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.main-wrapper, .container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.container {
  height: unset;
  width: unset;
  margin-bottom: 72px;
  min-height: 500px;
}
</style>