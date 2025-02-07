<script setup lang="ts">
import BlogsView from '@/views/BlogsView.vue'
import { onBeforeMount } from 'vue'
import { useBlogsStore } from '@/stores/blogs'
import { initialBlogFilter } from '@/types'

const blogsStore = useBlogsStore()
const username = 'user1'
</script>

<template>
  <div class="text-2xl text-black font-bold m-4">My Blogs</div>
  <BlogsView :username="username" />
</template>
