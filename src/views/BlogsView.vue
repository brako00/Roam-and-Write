<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useBlogsStore } from '@/stores/blogs'
import { storeToRefs } from 'pinia'
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
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="blog in blogs"
      :key="blog.id"
      class="flex justify-center items-center"
    >
      <BlogCard :blog="blog" />
    </v-col>
  </v-row>
</template>
