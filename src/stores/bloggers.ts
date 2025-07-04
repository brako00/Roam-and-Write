import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { bloggerType, bloggersFilter } from '@/types/index'
import axios from 'axios'
import { api_url, Endpoints } from '@/constants/endoints'
import useToastSetters from '@/utils/useToastSetters'

export const useBloggersStore = defineStore('bloggers', () => {
  const bloggers = ref<bloggerType[]>([])
  const { setErrorMessageToast } = useToastSetters()

  const fetchBloggers = async () => {
    try {
      //real backend
      const response = await axios.get(api_url + Endpoints.GET_USERS_WITH_BLOG_DATA)

      //backend mock
      // const response = await axios.get('http://localhost:3000/users')

      bloggers.value = response.data
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const fetchSelectedBlogger = async (id: string) => {
    try {
      //real backend
      const response = await axios.get(api_url + Endpoints.USER_GET_ONE + id)

      //backend mock
      // const response = await axios.get(`http://localhost:3000/users/${id}`)
      bloggers.value = response.data
    } catch (error: any) {
      setErrorMessageToast(error)
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

  return {
    bloggers,
    fetchBloggers,
    fetchSelectedBlogger
  }
})
