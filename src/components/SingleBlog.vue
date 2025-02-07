<script setup lang="ts">
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useBlogsStore } from '@/stores/blogs'
import type { blogType } from '@/types'
import { onBeforeMount } from 'vue'
import { parseDateFromString } from '@/types/utils'

import Card from 'primevue/card'

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
  <Card class="m-4">
    <template #title>
      <div class="flex justify-between">
        {{ blog.title }}
        <div @click="likedBlog" class="cursor-pointer">
          {{ blog.likes }}<i v-if="liked" class="pi pi-heart-fill"></i>
          <i v-else class="pi pi-heart"></i>
        </div>
      </div>
    </template>

    <template #subtitle>
      <i class="pi pi-user-edit"></i>{{ blog.username }} <i class="pi pi-calendar"></i
      >{{ parseDateFromString(blog.dateStart) }} -
      {{ parseDateFromString(blog.dateEnd) }}
      <i class="pi pi-map-marker"></i>{{ blog.location }}
    </template>

    <template #content>
      <div class="clearfix">
        <div class="float-right ml-4 mb-2 w-1/2">
          <img :src="blog.image" alt="blog image" />
        </div>
        <p>{{ blog.content }}</p>
      </div>
    </template>
  </Card>
</template>
