import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import '@/index.css'
import router from '@/router'

const pinia = createPinia()

import { definePreset } from '@primevue/themes'

const myPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
})

createApp(App)
  .use(PrimeVue, {
    // Default theme configuration
    theme: {
      preset: myPreset
    }
  })
  .use(pinia)
  .use(router)
  .mount('#app')
