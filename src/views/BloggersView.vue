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
  <div v-for="blogger in bloggers" :key="blogger.id">
    <v-card hover class="m-4 p-4">
      <v-row align="start">
        <!-- Avatar Section -->
        <v-col cols="2" class="text-left m-4">
          <v-avatar size="100">
            <v-img v-if="blogger.image !== null" :src="blogger.image" />
            <v-img v-else src="/user.png" />
          </v-avatar>
        </v-col>

        <!-- Name and Username Section -->
        <v-col cols="5" class="m-4">
          <div class="font-bold text-2xl">{{ blogger.username }}</div>
          <div>{{ blogger.name }} {{ blogger.lastname }}</div>
        </v-col>

        <!-- Stats Section -->
        <v-col cols="3" class="text-center m-4 mt-8">
          <div>Blogs: {{ blogger.numberOfBlogs }}</div>
          <div>Likes: {{ blogger.numberOfLikes }}</div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
