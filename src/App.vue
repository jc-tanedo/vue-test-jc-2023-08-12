<template>
  <div id="app">
    <div class="main-wrapper">
      <VLoader v-if="isLoading" />
      <VPost v-else-if="post" :post="post" />
      <VNoPost v-else @retry="fetchCurrentPost" />

      <button @click="prevPost">Previous Post</button>
      <button @click="nextPost">Next Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import VPost from './components/VPost.vue'
import VNoPost from './components/VNoPost.vue'
import VLoader from './components/VLoader.vue'

import { getPost } from './services/posts-service'

export default defineComponent({
  name: 'App',
  components: {
    VPost,
    VNoPost,
    VLoader,
  },
  setup () {
    const post = ref(null as object | null)
    const currentPostId = ref(1)
    const isLoading = ref(false)

    const fetchCurrentPost = async () => {
      isLoading.value = true
      post.value = await getPost(currentPostId.value)
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
      fetchCurrentPost,
      prevPost,
      nextPost,
      isLoading,
    }
  }
})
</script>
