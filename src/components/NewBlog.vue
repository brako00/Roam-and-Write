<script setup lang="ts">
import { ref } from 'vue'
import type { blogType } from '@/types'

import Editor from 'primevue/editor'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import DatePicker from 'primevue/datepicker'
import { formatDateToString } from '@/types/utils'
import { useBlogsStore } from '@/stores/blogs'
import { imageToByteArray } from '@/types/utils'
const blogsStore = useBlogsStore()

const blog = ref<blogType>({} as blogType)
const temporaryDate = ref<Date[]>([])

async function saveBlog() {
  console.log(blog.value)
  // blog.value.image = await imageToByteArray(blog.value.image)
  // blog.value.dateStart = formatDateToString(temporaryDate.value[0])
  // blog.value.dateEnd = formatDateToString(temporaryDate.value[1])
  // await blogsStore.createBlog(blog.value)
}
const errorMessage = ref('')

function handleFileUpload(event: any) {
  console.log('hello')
  console.log(event.target.files[0])
  // const file = event.target.files[0]
  // if (file) {
  //   imageToByteArray(file)
  //     .then((byteArray) => {
  //       blog.value.image = byteArray
  //       errorMessage.value = ''
  //     })
  //     .catch((error) => {
  //       errorMessage.value = 'Failed to convert the image to byte array.'
  //       console.error(error)
  //     })
  // } else {
  //   errorMessage.value = 'No file selected.'
  // }
}

const fileUpload = ref()

function imageUpload(event: any) {
  blog.value.image = event.target.files[0]

  // blog.value.image= fileUpload.value.files[0]
}
// Capture the selected image
const onFileSelect = (event: any) => {
  blog.value.image = event.files[0] // Store file object in form
}
</script>
<template>
  <div class="w-full flex justify-center items-center p-4">
    <div class="w-1/2 border-2 p-4 rounded">
      <h1 class="text-3xl font-bold text-black p-4 flex justify-center">Create a new blog</h1>
      <div class="field-wrap">
        <label for="blog_title">Title</label>
        <InputText v-model="blog.title" id="blog_title" />
      </div>
      <div class="field-wrap">
        <label for="blog_location">Location</label>
        <InputText v-model="blog.location" id="blog_location" />
      </div>

      <div class="field-wrap">
        <label for="blog_date">Duration</label>
        <DatePicker
          v-model="temporaryDate"
          selectionMode="range"
          :manualInput="false"
          id="blog_date"
        />
      </div>
      <div class="field-wrap">
        <label for="blog_content">Content</label>
        <Editor v-model="blog.content" editorStyle="height: 320px" id="blog_content" />
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
<style scoped></style>
