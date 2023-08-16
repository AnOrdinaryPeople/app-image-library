import axios from 'axios'
import type { App } from 'vue'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_IMGBB_API_URL,
})

export default (app: App<Element>) => {
  app.provide('axios', axiosInstance)
}
