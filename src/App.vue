<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
// import TheFooter from '@/components/TheFooter.vue'

import Toast from 'primevue/toast'
</script>

<template>
  <main>
    <TheHeader />
    <!-- <TheFooter /> -->
    <RouterView />
    <Toast />
  </main>
</template>
