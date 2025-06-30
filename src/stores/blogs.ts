import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { blogType, blogFilter } from '@/types/index'
import axios from 'axios'
import { Endpoints, api_url } from '@/types/endoints'
import useToastSetters from '@/types/useToastSetters'

export const useBlogsStore = defineStore('blogs', () => {
  const blogs = ref<blogType[]>([])
  const selectedBlog = ref<blogType>({} as blogType)
  const { setErrorMessageToast, setSuccessMessageToast } = useToastSetters()

  const fetchFilteredBlogs = async (payload: blogFilter) => {
    try {
      //real backend
      const response = await axios.post(api_url + Endpoints.GET_FILTERED_BLOGS, payload)

      // mock backend
      // const response = await axios.get('http://localhost:3000/blogs')

      blogs.value = response.data
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const fetchBlogs = async () => {
    try {
      //real backend
      const response = await axios.get(api_url + Endpoints.GET_BLOGS_WITH_USERNAME)

      //mock backend
      // const response = await axios.get('http://localhost:3000/blogs')

      blogs.value = response.data
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const fetchSelectedBlog = async (id: string) => {
    try {
      //real backend
      const response = await axios.get(api_url + Endpoints.BLOG_GET_ONE + id)

      //backend mock
      // const response = await axios.get(`http://localhost:3000/blogs/${id}`)

      selectedBlog.value = response.data
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const createBlog = async (payload: any) => {
    try {
      await axios.post(api_url + Endpoints.BLOG_ADD, payload)
      setSuccessMessageToast('Succesfully created blog')
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const updateBlog = async (payload: any) => {
    try {
      await axios.put(api_url + Endpoints.BLOG_UPDATE, payload)
      setSuccessMessageToast('Succesfully updated blog')
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const updateBlogLikes = async (id: number) => {
    try {
      await axios.put(api_url + Endpoints.BLOG_LIKES_UPDATE + id)
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(api_url + Endpoints.BLOG_DELETE + id)
      setSuccessMessageToast('Succesfully deleted blog')
    } catch (error: any) {
      setErrorMessageToast(error)
    }
  }

  return {
    blogs,
    selectedBlog,
    fetchFilteredBlogs,
    fetchSelectedBlog,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    updateBlogLikes
  }
})
