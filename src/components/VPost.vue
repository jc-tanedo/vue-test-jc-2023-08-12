<template>
  <div class="post-card">
    <h1 class="post-id-underlay">{{ post.id }}</h1>
    <VUser class="user" :user-id="post.userId" />
    <h2 class="title">{{ post.title }}</h2>
    <div class="article-container">
      <article class="body">{{ post.body }}</article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import VUser from './VUser.vue'

export default defineComponent({
  name: 'VPost',
  components: {
    VUser,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  }
})
</script>

<style scoped>
.post-card {
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 16px;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}
.post-card > .title {
  font-size: 2rem;
  margin-bottom: 16px;
}

.post-card > .article-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-card > .article-container > .body {
  font-size: 1.4rem;
  line-height: 1.5;
}

.post-card > .post-id-underlay {
  position: absolute;
  top: -32px;
  right: 16px;
  font-size: 20rem;
  color: rgba(0, 0, 0, 0.07);
  margin: 0;
  z-index: -1;
}
</style>