import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { createApp } from 'vue'
import App from './App.vue'
import '@/index.css'
import router from '@/router'
import { createPinia } from 'pinia'
const pinia = createPinia()

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { definePreset } from '@primevue/themes'

const vuetify = createVuetify({
  components,
  directives
})
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
  .use(vuetify)
  .mount('#app')
