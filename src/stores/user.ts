import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { api_url, Endpoints } from '@/types/endoints'
import type { bloggerType } from '@/types'
import useToastSetters from '@/types/useToastSetters'
import { useBloggersStore } from './bloggers'

interface loginType {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const bloggersStore = useBloggersStore()
  const isLoggedIn = ref(false)
  const user = ref<bloggerType>({} as bloggerType)
  const { setErrorMessageToast, setSuccessMessageToast } = useToastSetters()

  const loginCheck = async (payload: loginType) => {
    try {
      const response = await axios.post(api_url + Endpoints.USER_LOGIN, payload)
      fetchUser(response.data.userId)

      isLoggedIn.value = true
    } catch (error: any) {
      setErrorMessageToast(error.response.data.message)
    }
  }
  const fetchUser = async (id: number) => {
    try {
      //real backend
      const response = await axios.get(api_url + Endpoints.USER_GET_ONE + id)

      //backend mock
      // const response = await axios.get(`http://localhost:3000/users/${id}`)
      user.value = response.data
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }
  const AddUser = async (payload: bloggerType) => {
    try {
      await axios.post(api_url + Endpoints.USER_ADD, payload)
      setSuccessMessageToast('Succesfully registered')
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const UpdateUser = async (payload: any) => {
    try {
      await axios.put(api_url + Endpoints.USER_UPDATE, payload)
      setSuccessMessageToast('Succesfully updated user info')
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const DeleteUser = async (id: string) => {
    try {
      await axios.delete(api_url + Endpoints.USER_DELETE + id)
      setSuccessMessageToast('Succesfully deleted user')
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  return {
    isLoggedIn,
    user,
    loginCheck,
    AddUser,
    UpdateUser,
    DeleteUser
  }
})
