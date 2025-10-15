import type { PostRaw, Post } from '../components/PostCard'
import { instance } from '../utils/api'

const API_URL = '/posts'

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await instance.get<PostRaw[]>(API_URL)
  return (res.data as PostRaw[]).map((p) => ({
    ...p,
    date: p.date
  }))
}

export const addPost = async (newPost: Post): Promise<Post> => {
  const res = await instance.post<Post>(API_URL, newPost)
  return res.data
}

export const updatePost = async (updated: Post): Promise<void> => {
  await instance.put(`${API_URL}/${updated.id}`, updated)
}

export const deletePost = async (id: string): Promise<void> => {
  await instance.delete(`${API_URL}/${id}`)
}

export const getPostById = async (id: string): Promise<Post> => {
  const res = await instance.get<PostRaw>(`${API_URL}/${id}`)
  return { ...res.data, date: new Date(res.data.date).toISOString() }
}
