<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FileUpload, { type FileUploadUploadEvent } from 'primevue/fileupload'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Password from 'primevue/password'

const userStore = useUserStore()
const { user } = storeToRefs(useUserStore())

const passwordFirst = ref('')
const passwordSecond = ref('')
const passwordError = ref('')

const onFileSelect = (event: FileUploadUploadEvent) => {
  user.value.imagePath = event.files as any
}

async function updateUser() {
  passwordError.value = ''
  if (passwordFirst.value === passwordSecond.value) {
    passwordError.value = 'Passwords should match'
    return
  }

  const formData = new FormData()
  formData.append('title', user.value.username)
  formData.append('location', user.value.name)
  formData.append('dateStart', user.value.lastname)
  formData.append('dateEnd', user.value.email)
  formData.append('content', user.value.password)
  formData.append('imagePath', user.value.imagePath)

  await userStore.UpdateUser(formData)
}
</script>
<template>
  <div class="w-full flex justify-center items-center p-4">
    <div class="w-1/2 border-2 p-4 rounded">
      <h1 class="text-3xl font-bold text-black p-4 flex justify-center">Edit my account</h1>
      <div class="field-wrap">
        <label for="user_username">Username</label>
        <InputText v-model="user.username" id="user_username" />
      </div>
      <div class="field-wrap">
        <label for="user_name">Name</label>
        <InputText v-model="user.name" id="user_name" />
      </div>
      <div class="field-wrap">
        <label for="user_lastname">Lastname</label>
        <InputText v-model="user.lastname" id="user_lastname" />
      </div>
      <div class="field-wrap">
        <label for="user_email">Email</label>
        <InputText v-model="user.email" id="user_email" disabled />
      </div>

      <div class="field-wrap">
        <label for="password">Password</label>
        <Password
          v-model="passwordFirst"
          id="password"
          :feedback="false"
          :style="{ width: '100%' }"
          :inputStyle="{ width: '100%' }"
          toggleMask
        />
      </div>

      <div class="field-wrap">
        <label for="password_again">Repeat password</label>
        <Password
          v-model="passwordSecond"
          id="password_again"
          :feedback="false"
          :style="{ width: '100%' }"
          :inputStyle="{ width: '100%' }"
          toggleMask
        />
        <small v-if="passwordError" class="text-red-500">{{ passwordError }}</small>
      </div>

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
        <Button @click="updateUser" label="Update" />
      </div>
    </div>
  </div>
</template>
