<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import MainLayout from './layouts/main-layout.vue'

const theme = useTheme(),
  toggleTheme = (bool?: boolean) => {
    theme.global.name.value = (typeof bool === 'boolean' ? bool : theme.global.current.value.dark) ? 'light' : 'dark'
    window.localStorage.setItem('theme', theme.global.name.value)
  }

onMounted(() => {
  const userMedia = window.matchMedia('(prefers-color-scheme: dark)'),
    userTheme = window.localStorage.getItem('theme')

  toggleTheme(userTheme ? userTheme === 'light' : !userMedia.matches)

  userMedia.addEventListener('change', event => {
    toggleTheme(!event.matches)
  })
})
</script>

<template>
  <main-layout>
    <RouterView />
  </main-layout>
</template>
