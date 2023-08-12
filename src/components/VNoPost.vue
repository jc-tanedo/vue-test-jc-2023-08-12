<template>
    <div class="placeholder">
        <div class="title">Failed to load post #{{ postId }}, please try again.</div>
        <div class="action">
            <button class="retry" @click="$emit('retry')">Retry?</button>
        </div>
    </div>
    
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VNoPost',
    emits: ['retry'],
    props: {
        postId: {
            type: Number,
            required: true,
        }
    },
})
</script>

<style scoped>
.placeholder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 2rem;
    margin-bottom: 16px;
}

.action {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>