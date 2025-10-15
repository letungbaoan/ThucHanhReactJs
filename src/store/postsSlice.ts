import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { type Post } from '../components/PostCard'
import { fetchPosts, addPost, updatePost, deletePost, getPostById } from '../services/postService'
import axios from 'axios'

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null
}

// ---- Helper xử lý lỗi ----
function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.message === 'Network Error') return 'Network Error'
    if (err.response?.status === 404) return 'Post not found'
    return err.response?.data?.message || 'Server error'
  }
  if (err instanceof Error) return err.message
  return 'Unknown error'
}

// Load toàn bộ bài viết
export const loadPosts = createAsyncThunk('posts/loadPosts', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchPosts()
    return data
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err))
  }
})

// Load 1 bài viết theo id
export const loadPostById = createAsyncThunk('posts/loadPostById', async (id: string, { rejectWithValue }) => {
  try {
    const data = await getPostById(id)
    return data
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err))
  }
})

// Tạo bài viết mới
export const createPost = createAsyncThunk('posts/createPost', async (post: Post, { rejectWithValue }) => {
  try {
    const newPost = await addPost(post)
    return newPost
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err))
  }
})

// Sửa bài viết
export const editPost = createAsyncThunk('posts/editPost', async (post: Post, { rejectWithValue }) => {
  try {
    await updatePost(post)
    return post
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err))
  }
})

// Xóa bài viết
export const removePost = createAsyncThunk('posts/removePost', async (id: string, { rejectWithValue }) => {
  try {
    await deletePost(id)
    return id
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err))
  }
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ===== Load tất cả bài viết =====
    builder.addCase(loadPosts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.loading = false
      state.posts = action.payload
    })
    builder.addCase(loadPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // ===== Load bài viết theo ID =====
    builder.addCase(loadPostById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loadPostById.fulfilled, (state, action: PayloadAction<Post>) => {
      state.loading = false
      const existing = state.posts.find((p) => p.id === action.payload.id)
      if (!existing) {
        state.posts.push(action.payload)
      } else {
        Object.assign(existing, action.payload)
      }
    })
    builder.addCase(loadPostById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // ===== Thêm bài viết =====
    builder.addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload)
    })

    // ===== Sửa bài viết =====
    builder.addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) state.posts[index] = action.payload
    })

    // ===== Xóa bài viết =====
    builder.addCase(removePost.fulfilled, (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload)
    })
  }
})

export default postsSlice.reducer
