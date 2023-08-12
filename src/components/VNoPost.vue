<template>
    <div class="placeholder">
        <div class="title">Failed to load post, please try again.</div>
        <div class="action">
            <button @click="$emit('retry')">Retry</button>
        </div>
    </div>
    
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VNoPost',
    emits: ['retry'],
})
</script>
