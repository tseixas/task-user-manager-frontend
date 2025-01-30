import { defineStore } from '#q-app/wrappers'
import { createPinia } from 'pinia'
import { createApp } from 'vue';
import App from '../App.vue';


export default defineStore((/* { ssrContext } */) => {
  const pinia = createPinia()
  const app = createApp(App);

  app.use(pinia)

  return pinia
})
