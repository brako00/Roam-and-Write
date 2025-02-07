<script setup lang="ts">
import { useBloggersStore } from '@/stores/bloggers'

import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
const bloggersStore = useBloggersStore()
const { bloggers } = storeToRefs(bloggersStore)

onBeforeMount(async () => {
  await bloggersStore.fetchBloggers()
})

//add number of blogs and likes to the blogger card
</script>
<template>
  <div
    v-for="blogger in bloggers"
    :key="blogger.id"
    class="bg-white shadow-md rounded-lg p-6 flex items-center justify-between space-x-4 m-4 hoverClass"
  >
    <!-- Profile Image -->
    <img :src="blogger.image" class="rounded-full w-24 h-24 object-cover" />

    <!-- User Info -->
    <div class="flex-1 ml-12">
      <div class="font-bold text-2xl">{{ blogger.username }}</div>
      <div class="text-gray-600">{{ blogger.name }} {{ blogger.lastname }}</div>
    </div>

    <!-- Stats -->
    <div class="text-left text-gray-700">
      <div><span class="font-semibold">Blogs:</span> {{ blogger.numberOfBlogs }}</div>
      <div><span class="font-semibold">Likes:</span> {{ blogger.numberOfLikes }}</div>
    </div>
  </div>
</template>

<style scoped>
.hoverClass:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  background-color: #f6f6f6;
}
</style>
