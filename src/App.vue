<template>
  <div id="app">
    <VPost :post="post" />
    <button @click="prevPost">Previous Post</button>
    <button @click="nextPost">Next Post</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VPost from './components/VPost.vue'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components: {
    VPost
  },
  setup () {
    const post = ref({});

    (async () => {
      // Here is the url for getting posts. The post id is at the end of the url.
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
      console.log(data)
      post.value = data
    })()

    const prevPost = () => {
      // TODO
    }

    const nextPost = () => {
      // TODO
    }

    return {
      post,
      prevPost,
      nextPost
    }
  }
})
</script>
