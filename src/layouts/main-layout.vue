<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme(),
  toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    window.localStorage.setItem('theme', theme.global.name.value)
  }
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>App Image Library</v-app-bar-title>
      <template #append>
        <v-btn icon @click="toggleTheme">
          <v-icon :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'" />
          <span class="d-sr-only">toggle</span>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
