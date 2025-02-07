<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useBlogsStore } from '@/stores/blogs'
import type { blogType } from '@/types'
import { onBeforeMount } from 'vue'
import { parseDateFromString } from '@/types/utils'

const blogsStore = useBlogsStore()

const route = useRoute()
const blogId = ref(route.params.id[0])

const blog = ref({} as blogType)

onBeforeMount(async () => {
  await blogsStore.fetchSelectedBlog(blogId.value)
  blog.value = blogsStore.selectedBlog
})

const liked = ref<boolean>(false)

function likedBlog() {
  liked.value = !liked.value
  blog.value.likes = liked.value ? blog.value.likes + 1 : blog.value.likes - 1
}

onBeforeRouteLeave(async (to, from) => {
  console.log('Leaving blog')
  console.log(liked.value)
  console.log(blog.value)

  // if (liked.value) await blogsStore.updateBlogLikes(parseInt(blogId.value))
  if (liked.value) await blogsStore.updateBlog(blog.value)

  liked.value = false
})
</script>
<template>
  <v-card variant="elevated" class="m-4">
    <v-card-title>
      <div class="flex justify-between">
        {{ blog.title }}
        <div @click="likedBlog" class="cursor-pointer">
          {{ blog.likes }}<v-icon icon="mdi-heart" v-if="liked"></v-icon>
          <v-icon icon="mdi-heart-outline" v-else></v-icon>
        </div></div
    ></v-card-title>
    <v-card-subtitle>
      <v-icon icon="mdi-account-edit"></v-icon>{{ blog.username }}
      <v-icon icon="mdi-calendar-range"></v-icon>{{ parseDateFromString(blog.dateStart) }} -
      {{ parseDateFromString(blog.dateEnd) }}
      <v-icon icon="mdi-map-marker"></v-icon>{{ blog.location }}
    </v-card-subtitle>
    <v-card-text class="clearfix">
      <div class="float-right ml-4 mb-2 w-1/2">
        <v-img :src="blog.image" height="auto" />
      </div>
      <p>{{ blog.content }}</p>
    </v-card-text>
  </v-card>
</template>
