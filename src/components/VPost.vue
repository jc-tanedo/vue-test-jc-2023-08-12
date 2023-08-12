<template>
  <div class="post">
    <h2 class="title">{{ post.title }}</h2>
    <article class="body">{{ post.body }}</article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
})
</script>
