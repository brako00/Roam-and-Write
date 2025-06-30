<script setup lang="ts">
import BlogsView from '@/views/BlogsView.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const { user } = storeToRefs(useUserStore())
</script>

<template>
  <div class="flex flex-col m-4">
    <label for="user_numberOfLikes">Number of likes: {{ user.userBlogLikes.likesCount }}</label>
    <label for="user_numberOfBlogs">Number of blogs: {{ user.userBlogLikes.blogCount }}</label>
  </div>
  <div class="text-2xl text-black font-bold m-4">My Blogs</div>
  <BlogsView :username="user.username" />
</template>
