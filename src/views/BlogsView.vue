<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBlogsStore } from '@/stores/blogs'
import BlogCard from '@/components/BlogCard.vue'
import BlogFilter from '@/components/BlogFilter.vue'
import { initialBlogFilter } from '@/types'

const blogsStore = useBlogsStore()
const { blogs } = storeToRefs(blogsStore)

const props = defineProps({
  username: {
    type: String,
    default: ''
  }
})

onBeforeMount(async () => {
  await blogsStore.fetchFilteredBlogs({ ...initialBlogFilter, username: props.username })
})
</script>

<template>
  <BlogFilter />
  <div v-if="!blogs.length">
    <h1 class="text-center text-xl m-10 font-bold">No blogs to show</h1>
  </div>
  <div
    class="grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
  </div>
</template>
