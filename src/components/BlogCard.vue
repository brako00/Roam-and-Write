<script setup lang="ts">
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'
import type { blogType } from '@/types'
import { parseDateFromString } from '@/utils/utils'

const router = useRouter()

const props = defineProps({
  blog: {
    type: Object as PropType<blogType>,
    required: true
  }
})
</script>
<template>
  <Card class="m-4 w-80 hoverClass" max-height="500px" @click="router.push(`/blogs/${blog.id}`)">
    <template #title>{{ blog.title }}</template>

    <template #subtitle
      ><div>
        <i class="pi pi-calendar"></i>
        {{ parseDateFromString(blog.dateStart) }} -
        {{ parseDateFromString(blog.dateEnd) }}
      </div>
      <div><i class="pi pi-map-marker"></i>{{ blog.location }}</div>
      <div><i class="pi pi-user-edit"></i>{{ blog.username }}</div>
      <div class="flex justify-end items-center">
        {{ blog.likes }} <i class="pi pi-heart-fill"></i></div
    ></template>
    <template #content>
      <img v-if="blog.imagePath" :alt="blog.title" :src="blog.imagePath" />
      <p class="ellipsis mt-4">
        {{ blog.content }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Read more" class="w-full" />
      </div> </template
  ></Card>
</template>
<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hoverClass:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  background-color: #f6f6f6;
}
</style>
