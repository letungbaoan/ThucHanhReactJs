import React, { useEffect } from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import About from './pages/About'
import PostForm from './pages/PostForm'
import EditPostWrapper from './pages/EditPostWrapper'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'
import { loadPosts, createPost, editPost } from './store/postsSlice'
import type { Post } from './components/PostCard'
import { useAppDispatch, useAppSelector } from './store/hooks'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { posts, loading } = useAppSelector((state) => state.posts)
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const handleAdd = async (newPost: Post) => {
    try {
      await dispatch(createPost(newPost)).unwrap()
      toast.success(t('toast:addSuccess'))
    } catch {
      toast.error(t('toast:loadError'))
    }
  }

  const handleUpdate = async (updated: Post) => {
    try {
      await dispatch(editPost(updated)).unwrap()
      toast.success(t('toast:updateSuccess'))
    } catch {
      toast.error(t('toast:loadError'))
    }
  }

  return (
    <Router>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='min-h-screen bg-gray-100 text-black dark:bg-gray-800 dark:text-white'>
        <Header title='Simple Blog' />
        <main className='mx-auto max-w-3xl p-6'>
          {loading && <p className='text-center text-gray-500'>{t('loading:message')}</p>}

          <Routes>
            <Route path='/' element={<Home posts={posts} />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/about' element={<About />} />
            <Route path='/new-post' element={<PostForm onSubmit={handleAdd} />} />
            <Route path='/edit-post/:id' element={<EditPostWrapper onUpdatePost={handleUpdate} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
