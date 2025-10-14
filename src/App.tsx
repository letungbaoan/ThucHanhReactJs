import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import { type Post } from './components/PostCard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import About from './pages/About'
import PostForm from './pages/PostForm'
import EditPostWrapper from './pages/EditPostWrapper'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from 'react-i18next'

import { fetchPosts, addPost, updatePost, deletePost } from './services/postService'

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchPosts()
        setPosts(data)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : t('error:unknown'))
        toast.error(t('toast:loadError'))
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [t])

  const handleAdd = async (newPost: Post) => {
    try {
      const post = await addPost(newPost)
      setPosts([...posts, post])
      toast.success(t('toast:addSuccess'))
    } catch {
      toast.error(t('toast:loadError'))
    }
  }

  const handleUpdate = async (updated: Post) => {
    try {
      await updatePost(updated)
      setPosts((prevPosts) => prevPosts.map((p) => (p.id === updated.id ? updated : p)))
      toast.success(t('toast:updateSuccess'))
    } catch {
      toast.error(t('toast:loadError'))
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
      toast.success(t('toast:deleteSuccess'))
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
          {error && <p className='text-center text-red-500'>{error}</p>}
          {!loading && !error && (
            <Routes>
              <Route path='/' element={<Home posts={posts} />} />
              <Route path='/post/:id' element={<PostDetail onDelete={handleDelete} />} />
              <Route path='/about' element={<About />} />
              <Route path='/new-post' element={<PostForm onSubmit={handleAdd} />} />
              <Route path='/edit-post/:id' element={<EditPostWrapper onUpdatePost={handleUpdate} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  )
}

export default App
