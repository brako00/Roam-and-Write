<script setup>
import { reactive, ref } from 'vue'
import { useBloggersStore } from '@/stores/bloggers'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const router = useRouter()

const bloggersStore = useBloggersStore()
const loginAttempt = ref({ username: '', password: '' })
const errors = ref(null)

const loginCheck = async () => {
  errors.value = null
  errors.value = await bloggersStore.loginCheck(loginAttempt.value)
  if (errors) {
    router.push('/')
  }
}
</script>
<template>
  <div class="w-full flex justify-center items-center p-4">
    <form class="w-1/2 border-2 p-4 rounded">
      <h1 class="text-4xl font-bold text-black p-4 flex justify-center">Login</h1>
      <div class="field-wrap">
        <label for="username">Username</label>
        <InputText v-model="loginAttempt.username" id="username" />
      </div>

      <div class="field-wrap">
        <label for="password">Password</label>
        <InputText v-model="loginAttempt.password" id="password" type="password" />
      </div>
      <div class="text-red h-10">
        <div v-if="errors">
          {{ errors }}
        </div>
      </div>
      <div class="flex justify-center items-center pb-4">
        <Button @click="loginCheck">Login</Button>
      </div>
      <p>
        Not registered?
        <router-link to="/register" class="text-[#2064c4] font-bold">Register now!</router-link>
      </p>
    </form>
  </div>
</template>
