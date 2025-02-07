<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
// import TheFooter from '@/components/TheFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <TheHeader />
    <!-- <TheFooter /> -->
    <RouterView />
  </main>
</template>

<style scoped lang="scss"></style>
