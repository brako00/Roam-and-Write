<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import Card from 'primevue/card'
import type { blogType } from '@/types'
import { parseDateFromString } from '@/utils/utils'
import { useBlogsStore } from '@/stores/blogs'
import Button from 'primevue/button'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const blogsStore = useBlogsStore()
const route = useRoute()
const router = useRouter()

const { isLoggedIn } = storeToRefs(userStore)

const blogId = ref(route.params.id as string)
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

const editBlog = async () => {
  await router.push({
    name: 'new',
    params: { op: 'edit', id: blog.value.id }
  })
}
</script>
<template>
  <div v-if="isLoggedIn" class="flex justify-end mt-4 mr-4">
    <Button @click="editBlog" label="Edit blog" />
  </div>
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
        <div v-if="blog.imagePath" class="float-right ml-4 mb-2 w-1/2">
          <img :src="blog.imagePath" alt="blog image" />
        </div>
        <p>{{ blog.content }}</p>
      </div>
    </template>
  </Card>
</template>
