<template>
  TODO: display the post
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
