import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { blogType, blogFilter } from '@/types/index'
import axios from 'axios'
import { Endpoints, api_url } from '@/types/endoints'

export const useBlogsStore = defineStore('blogs', () => {
  const blogs = ref<blogType[]>([])
  const selectedBlog = ref<blogType>({} as blogType)

  const fetchFilteredBlogs = async (payload: blogFilter) => {
    try {
      const response = await axios.post(api_url + Endpoints.GET_FILTERED_BLOGS, payload)

      blogs.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBlogs = async () => {
    try {
      // const response = await axios.get(api_url + Endpoints.GET_BLOGS_WITH_USERNAME)
      const response = await axios.get('http://localhost:3000/blogs')

      blogs.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSelectedBlog = async (id: string) => {
    try {
      //real backend
      // const response = await axios.get(api_url + Endpoints.BLOG_GET_ONE + id)

      //backend mock
      const response = await axios.get(`http://localhost:3000/blogs/${id}`)

      selectedBlog.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const createBlog = async (payload: blogType) => {
    try {
      await axios.post(api_url + Endpoints.BLOG_ADD, payload)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlog = async (payload: blogType) => {
    try {
      await axios.put(api_url + Endpoints.BLOG_UPDATE, payload)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlogLikes = async (id: number) => {
    try {
      await axios.put(`https://localhost:44300/api/Blog/UpdateLikes?id=${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(api_url + Endpoints.BLOG_DELETE + id)
    } catch (error) {
      console.log(error)
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
