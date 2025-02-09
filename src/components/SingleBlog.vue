<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import Card from 'primevue/card'
import type { blogType } from '@/types'
import { parseDateFromString } from '@/types/utils'
import { useBlogsStore } from '@/stores/blogs'

const blogsStore = useBlogsStore()
const route = useRoute()

const blogId = ref(route.params.id[0])
const blog = ref({} as blogType)
const liked = ref<boolean>(false)

onBeforeMount(async () => {
  await blogsStore.fetchSelectedBlog(blogId.value)
  blog.value = blogsStore.selectedBlog
})

onBeforeRouteLeave(async (to, from) => {
  if (liked.value) await blogsStore.updateBlog(blog.value)

  liked.value = false
})

function likedBlog() {
  liked.value = !liked.value
  blog.value.likes = liked.value ? blog.value.likes + 1 : blog.value.likes - 1
}
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
