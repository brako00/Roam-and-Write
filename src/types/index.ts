export interface blogType {
  id: number
  title: string
  content: string
  imagePath: any
  location: string
  dateStart: string
  dateEnd: string
  likes: number
  username: string
}

export interface blogFilter {
  title: string
  location: string
  dateStart: string
  dateEnd: string
  username: string
}

export const initialBlogFilter: blogFilter = {
  title: '',
  location: '',
  dateStart: '',
  dateEnd: '',
  username: ''
}

export interface bloggerType {
  id: number
  name: string
  lastname: string
  username: string
  email: string
  password: string
  imagePath: string
  numberOfLikes?: number
  numberOfBlogs?: number
  // blogs: string[]
}

export interface bloggersFilter {
  name: string
  lastname: string
  username: string
}
