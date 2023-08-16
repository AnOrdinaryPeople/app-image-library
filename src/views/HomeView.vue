<script setup lang="ts">
import type { AxiosStatic } from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { inject } from 'vue'

type ImgbbResponseImage = {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}

type ImgbbResponse = {
  data: {
    id: string
    title: string
    url_viewer: string
    url: string
    display_url: string
    width: number
    height: number
    size: number
    time: number
    expiration: number
    image: ImgbbResponseImage
    thumb: ImgbbResponseImage
    medium: ImgbbResponseImage
    delete_url: string
  }
  success: boolean
  status: number
}

const http = inject<AxiosStatic>('axios'),
  images = ref<string[]>([]),
  valid = ref(false),
  files = ref<File[]>([]),
  acceptImage = ['jpg', 'jpeg', 'bmp', 'png', 'gif'],
  acceptImageStr = acceptImage.reduce(
    (str, type, idx) => str += `image/${type}${idx === acceptImage.length - 1 ? '' : ','}`,
    ''
  ),
  rules = [
    (files: File[]) => !!files[0] || 'File is required.',
    (files: File[]) => acceptImage.includes(files[0].type.split(/\//g)[1]) || 'File must be image.',
    (files: File[]) => files[0].size <= 2000000 || 'File size must be less than equal 2MB.',
  ],
  disabled = ref(false),
  messages = reactive<{ message: string, color: string }[]>([]),
  snackbar = ref(false),
  uploadImage = () => {
    if (valid.value) {
      messages.splice(0)
      snackbar.value = false
      disabled.value = true

      const form = new FormData()

      form.append('key', import.meta.env.VITE_IMGBB_API_KEY)
      form.append('image', files.value[0])

      http?.post<ImgbbResponse>('/1/upload', form)
        .then((resp) => {
          images.value.unshift(resp.data.data.url)
          window.localStorage.setItem('images', JSON.stringify(images.value))
          messages.push({ message: 'Image has been stored.', color: 'success' })
          snackbar.value = true
        })
        .catch((err) => {
          messages.push({ message: err.response.data.error.message, color: 'error' })
          snackbar.value = true
        })
        .finally(() => {
          files.value = []
          disabled.value = false
        })
    }
  }

onMounted(() => {
  const localImages = window.localStorage.getItem('images')

  if (localImages) {
    try {
      images.value = JSON.parse(localImages)
    } catch {
      //
    }
  }
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <div class="mb-3">Upload Image</div>
        <v-form v-model="valid" @submit.prevent="uploadImage">
          <v-file-input v-model="files" label="Image" :accept="acceptImageStr" :rules="rules" />
          <v-btn class="mt-3" type="submit" :loading="disabled" :disabled="disabled" block>Submit</v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" md="6" lg="8">
        <v-row>
          <v-col v-for="(str, idx) of images" :key="idx" cols="6" md="4" lg="3">
            <v-card>
              <v-img :src="str" :alt="`image ${idx}`" cover />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-for="(obj, idx) of messages" :key="idx" v-model="snackbar" :color="obj.color">
      {{ obj.message }}
    </v-snackbar>
  </v-container>
</template>
