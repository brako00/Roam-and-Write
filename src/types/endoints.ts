export const api_url = 'https://localhost:44300/'

export enum Endpoints {
  BLOG_GET = 'api/Blog/GetBlog/',
  GET_BLOGS_WITH_USERNAME = 'api/Blog/FetchBlogsWithUsername',
  BLOG_GET_ONE = 'api/Blog/GetBlogWithUsername/',
  BLOG_ADD = 'api/Blog/AddBlog',
  BLOG_UPDATE = 'api/Blog/UpdateBlog',
  BLOG_LIKES_UPDATE = 'api/Blog/UpdateLikes/',
  BLOG_DELETE = 'api/Blog/DeleteBlog/',
  GET_FILTERED_BLOGS = 'api/Blog/Filter',

  USER_GET_ALL = 'api/User/GetAll',
  USER_GET_ONE = 'api/User/GetUser/',
  USER_ADD = 'api/User/AddUser',
  USER_UPDATE = 'api/User/UpdateUser',
  USER_DELETE = 'api/User/DeleteUser/',
  USER_USERNAME_CHECK = 'api/User/UsernameCheck',
  USER_LOGIN = 'api/User/CheckCredentials',
  GET_USERS_WITH_BLOG_DATA = 'api/User/FetchUsersWithBlogData'
}
