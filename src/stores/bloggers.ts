import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { bloggerType, bloggersFilter } from '@/types/index'
import axios from 'axios'
import { api_url, Endpoints } from '@/types/endoints'

interface loginType {
  username: string
  password: string
}

export const useBloggersStore = defineStore('bloggers', () => {
  const bloggers = ref<bloggerType[]>([])
  const isLoggedIn = ref(false)

  const fetchBloggers = async () => {
    try {
      //backend mock
      const response = await axios.get('http://localhost:3000/users')

      //real backend
      // const response = await axios.get(api_url + Endpoints.GET_USERS_WITH_BLOG_DATA)
      bloggers.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSelectedBlogger = async (id: string) => {
    try {
      //backend mock
      const response = await axios.get(`http://localhost:3000/users/${id}`)

      //real backend
      // const response = await axios.get(api_url + Endpoints.USER_GET_ONE + id)
      bloggers.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  //todo: implement this function
  // const fetchFilteredBloggers = async (payload: bloggersFilter) => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/users', payload)
  //     bloggers.value = response.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const AddUser = async (payload: bloggerType) => {
    try {
      await axios.post(api_url + Endpoints.USER_ADD, payload)
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateUser = async (payload: bloggerType) => {
    try {
      await axios.put(api_url + Endpoints.USER_UPDATE, payload)
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteUser = async (id: string) => {
    try {
      await axios.delete(api_url + Endpoints.USER_DELETE + id)
    } catch (error) {
      console.log(error)
    }
  }

  const loginCheck = async (payload: loginType) => {
    try {
      await axios.post(api_url + Endpoints.USER_LOGIN, payload)
      isLoggedIn.value = true
    } catch (error: any) {
      return error.response.data.message
    }
  }

  return {
    bloggers,
    isLoggedIn,
    fetchBloggers,
    fetchSelectedBlogger,
    AddUser,
    UpdateUser,
    DeleteUser,
    loginCheck
  }
})
