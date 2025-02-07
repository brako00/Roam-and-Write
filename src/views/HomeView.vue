<script setup lang="ts">
import { useBlogsStore } from '@/stores/blogs'
import type { blogType } from '@/types'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import BlogCard from '@/components/BlogCard.vue'

const blogsStore = useBlogsStore()
const { blogs } = storeToRefs(blogsStore)

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

const isLoading = ref(false)
const numberOfRandomBlogs = 3
const numberOfFeaturedBlogs = 4
const randomBlogs = ref<blogType[]>([])
const featuredBlogs = ref<blogType[]>([])
</script>
<template>
  <v-progress-circular
    v-if="isLoading"
    color="primary"
    model-value="20"
    :size="49"
    :width="7"
  ></v-progress-circular>
  <div v-else>
    <div class="flex justify-center align-center w-full myClass">
      <v-carousel :cycle="true" :interval="3000" :hide-delimiters="true" class="max-w-4xl">
        <v-carousel-item
          v-for="blog in randomBlogs"
          :key="blog.id"
          :src="blog.image"
          :alt="blog.title"
          :aspect-ratio="16 / 9"
        >
          <v-row class="flex align-end justify-end w-full h-full">
            <v-col cols="12" sm="3">
              <v-card>
                <v-card-title>{{ blog.title }}</v-card-title>
                <v-card-subtitle>{{ blog.username }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div>
      <h1 class="titleClass mt-4">Feature blogs</h1>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="blog in featuredBlogs"
          :key="blog.id"
          class="flex justify-center items-center"
        >
          <BlogCard :blog="blog" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<style scoped>
.myClass {
  background-image: linear-gradient(#4c8ae0, white);
}
</style>
