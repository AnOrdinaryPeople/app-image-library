<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

defineProps({
  messages: {
    type: Array as PropType<{ message: string, color: string }[]>,
    required: true,
  }
})

const value = ref(true)
</script>

<template>
  <v-snackbar v-for="(obj, idx) of messages" :key="idx" v-model:model-value="value" :color="obj.color">
    {{ obj.message }}
  </v-snackbar>
</template>
