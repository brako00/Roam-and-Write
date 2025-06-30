<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ProgressSpinner from 'primevue/progressspinner'
import Carousel from 'primevue/carousel'
import Card from 'primevue/card'
import BlogCard from '@/components/BlogCard.vue'
import { useBlogsStore } from '@/stores/blogs'
import type { blogType } from '@/types'

const blogsStore = useBlogsStore()
const { blogs } = storeToRefs(blogsStore)

const isLoading = ref(false)
const numberOfRandomBlogs = 3
const numberOfFeaturedBlogs = 4
const randomBlogs = ref<blogType[]>([])
const featuredBlogs = ref<blogType[]>([])

onBeforeMount(async () => {
  isLoading.value = true
  await blogsStore.fetchBlogs().then(() => {
    //sort by date
    randomBlogs.value = blogs.value
      .sort((a, b) => {
        const startDateA = new Date(a.dateStart)
        const startDateB = new Date(b.dateStart)
        if (startDateA < startDateB) {
          return -1
        }
        if (startDateA > startDateB) {
          return 1
        }
        return 0
      })
      .slice(0, numberOfRandomBlogs)

    //sort by most popular
    featuredBlogs.value = blogs.value
      .sort((a, b) => b.likes - a.likes)
      .slice(0, numberOfFeaturedBlogs)
  })
  isLoading.value = false
})
</script>
<template>
  <div v-if="isLoading" class="flex justify-center align-center w-full h-full">
    <ProgressSpinner stroke-width="4" />
  </div>
  <div v-else>
    <div class="carousel">
      <Carousel
        :value="randomBlogs"
        :circular="true"
        :autoplay-interval="3000"
        :autoplay="true"
        :num-visible="1"
        :num-scroll="1"
        class="max-w-4xl"
      >
        <template #item="slotProps">
          <div class="flex justify-end align-center w-full h-full">
            <img :src="slotProps.data.imagePath" :alt="slotProps.data.title" class="aspect-16/9" />
            <Card class="absolute bottom-0 w-1/3">
              <template #title>{{ slotProps.data.title }}</template>
              <template #content>{{ slotProps.data.username }}</template>
            </Card>
          </div>
        </template>
      </Carousel>
    </div>

    <div>
      <h1 class="titleClass mt-4">Feature blogs</h1>
      <div
        class="grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <BlogCard v-for="blog in featuredBlogs" :key="blog.id" :blog="blog" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.carousel {
  @apply flex justify-center w-full;

  background-image: linear-gradient(#4c8ae0, white);
}
</style>
