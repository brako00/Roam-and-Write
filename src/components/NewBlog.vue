<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FileUpload, { type FileUploadUploadEvent } from 'primevue/fileupload'
import DatePicker from 'primevue/datepicker'
import type { blogType } from '@/types'
import { formatDateToString } from '@/types/utils'
import { useBlogsStore } from '@/stores/blogs'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const blogsStore = useBlogsStore()
const { fetchSelectedBlog } = blogsStore
const { selectedBlog: blog } = storeToRefs(blogsStore)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const temporaryDate = ref<Date[]>([])

const route = useRoute()
const action = route.params.op
const id = route.params.id as string

const titleError = ref('')
const locationError = ref('')
const dateError = ref('')
const contentError = ref('')

const onFileSelect = (event: any) => {
  blog.value.imagePath = event.files[0]
}

const validateFields = (): boolean => {
  titleError.value = ''
  locationError.value = ''
  dateError.value = ''
  contentError.value = ''

  if (!blog.value.title) {
    titleError.value = 'This is required'
  }
  if (!blog.value.location) {
    locationError.value = 'This is required'
  }
  if (!temporaryDate.value[0]) {
    dateError.value = 'This is required'
  }
  if (!blog.value.content) {
    contentError.value = 'This is required'
  }

  if (titleError.value || locationError.value || dateError.value || contentError.value) return false
  else return true
}

async function saveBlog() {
  if (!validateFields()) return

  blog.value.dateStart = formatDateToString(temporaryDate.value[0])
  blog.value.dateEnd = formatDateToString(temporaryDate.value[1])

  const formData = new FormData()
  formData.append('title', blog.value.title)
  formData.append('location', blog.value.location)
  formData.append('dateStart', blog.value.dateStart)
  formData.append('dateEnd', blog.value.dateEnd)
  formData.append('content', blog.value.content)
  formData.append('imagePath', blog.value.imagePath)
  formData.append('userId', user.value.id)

  if (action === 'create') await blogsStore.createBlog(formData)
  else if (action === 'edit') await blogsStore.updateBlog(formData)
}

onBeforeMount(async () => {
  if (id) {
    await fetchSelectedBlog(id)
    temporaryDate.value = [new Date(blog.value.dateStart), new Date(blog.value.dateEnd)]
  } else blog.value = {} as blogType
})
</script>
<template>
  <div class="w-full flex justify-center items-center p-4">
    <div class="w-1/2 border-2 p-4 rounded">
      <h1 class="text-3xl font-bold text-black p-4 flex justify-center">Create a new blog</h1>
      <div class="field-wrap">
        <label for="blog_title">Title*</label>
        <InputText v-model="blog.title" id="blog_title" :invalid="!!titleError.length" />
        <small v-if="titleError" class="text-red-500">{{ titleError }}</small>
      </div>
      <div class="field-wrap">
        <label for="blog_location">Location*</label>
        <InputText v-model="blog.location" id="blog_location" :invalid="!!locationError.length" />
        <small v-if="locationError" class="text-red-500">{{ locationError }}</small>
      </div>

      <div class="field-wrap">
        <label for="blog_date">Duration*</label>
        <DatePicker
          v-model="temporaryDate"
          selectionMode="range"
          :manualInput="false"
          id="blog_date"
          :invalid="!!dateError.length"
        />
        <small v-if="dateError" class="text-red-500">{{ dateError }}</small>
      </div>
      <div class="field-wrap">
        <label for="blog_content">Content*</label>
        <Editor
          v-model="blog.content"
          editorStyle="height: 320px"
          id="blog_content"
          :class="!!contentError.length ? 'invalid' : ''"
        />
        <small v-if="contentError" class="text-red-500">{{ contentError }}</small>
      </div>
      <!-- TODO: Decide if one or more images can be uploaded -->
      <div>
        <FileUpload
          accept="image/*"
          :multiple="false"
          :maxFileSize="5000000"
          :customUpload="true"
          @select="onFileSelect"
        >
          <template #empty>
            <div class="p-4">
              <i class="pi pi-image" style="font-size: 3rem"></i>
              <p>Drag and drop image here to upload</p>
            </div>
          </template>
        </FileUpload>
      </div>
      <div class="flex justify-center items-center">
        <Button @click="saveBlog" label="Post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.invalid {
  border: solid 1px #f87171;
  border-radius: 6px;
}
</style>
