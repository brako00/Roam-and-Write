<script setup lang="ts">
import { useBloggersStore } from '@/stores/bloggers'
import { storeToRefs } from 'pinia'
import Avatar from 'primevue/avatar'

const { isLoggedIn } = storeToRefs(useBloggersStore())
</script>
<template>
  <div class="flex items-center p-4 bg-primary h-12">
    <div class="flex space-x-2">
      <router-link to="/" class="p-2">Home</router-link>
      <router-link to="/blogs" class="p-2">Blogs</router-link>
      <router-link to="/bloggers" class="p-2">Bloggers</router-link>
      <!-- <router-link to="/register" class="p-2">Register</router-link> -->
    </div>
    <div class="flex-grow"></div>
    <router-link to="/login" class="p-2" v-if="!isLoggedIn">Login</router-link>

    <!-- v-if="isLoggedIn" -->
    <div class="relative dropdown z-50">
      <Avatar image="airplane.png" shape="circle" />
      <div v-if="isLoggedIn" class="dropdown-content">
        <router-link to="/new" class="block px-4 py-2 text-black hover:bg-gray-200"
          >Create blog</router-link
        >
        <router-link to="/myAccount" class="block px-4 py-2 text-black hover:bg-gray-200"
          >My blogs</router-link
        >
        <a href="#" class="block px-4 py-2 text-black hover:bg-gray-200" @click="isLoggedIn = false"
          >Log out</a
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
