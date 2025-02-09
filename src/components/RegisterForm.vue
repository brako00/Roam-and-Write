<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'

const registerData = ref({
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const registrationCheck = () => {
  console.log(registerData.value)
}
</script>
<template>
  <div class="w-full flex justify-center items-center p-4">
    <form class="w-1/2 border-2 p-4 rounded">
      <h1 class="text-4xl font-bold text-black p-4 flex justify-center">Sign up</h1>

      <div class="field-wrap">
        <label for="firstName">First name</label>
        <InputText v-model="registerData.firstName" id="firstName" />
      </div>
      <div class="field-wrap">
        <label for="lastName">Last name</label>
        <InputText v-model="registerData.lastName" id="lastName" />
      </div>
      <div class="field-wrap">
        <label for="username">Username</label>
        <InputText v-model="registerData.username" id="username" />
      </div>

      <div class="field-wrap">
        <label for="password">Password</label>
        <Password
          v-model="registerData.password"
          id="password"
          :feedback="false"
          :style="{ width: '100%' }"
          :inputStyle="{ width: '100%' }"
          toggleMask
        />
      </div>
      <div class="field-wrap">
        <label for="confirmPassword">Confirm password</label>
        <Password
          v-model="registerData.confirmPassword"
          id="confirmPassword"
          :feedback="false"
          :style="{ width: '100%' }"
          :inputStyle="{ width: '100%' }"
          toggleMask
        />
      </div>

      <div class="flex justify-center items-center pb-4">
        <Button @click="registrationCheck">Register</Button>
      </div>

      <p>
        Already registered?
        <router-link to="/login" class="text-[#2064c4] font-bold">Login now!</router-link>
      </p>
    </form>
  </div>
</template>
