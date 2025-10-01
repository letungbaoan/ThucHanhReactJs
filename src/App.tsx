import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import { type PostRaw, type Post } from './components/PostCard'
import { initialPosts } from './data/initialPosts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import About from './pages/About'
import PostForm from './pages/PostForm'

const STORAGE_KEY = 'blogPosts'

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY)
    if (savedPosts) {
      try {
        const parsed: PostRaw[] = JSON.parse(savedPosts)
        const restored: Post[] = parsed.map((p) => ({
          ...p,
          date: new Date(p.date)
        }))
        setPosts(restored)
        return
      } catch (err) {
        console.error('Error parsing posts from localStorage', err)
      }
    }
    setPosts(initialPosts)
  }, [])

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  }, [posts])

  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <Header title='Simple Blog' />

        <main className='mx-auto max-w-3xl p-6'>
          <Routes>
            <Route path='/' element={<Home posts={posts} />} />
            <Route path='/post/:id' element={<PostDetail posts={posts} />} />
            <Route path='/about' element={<About />} />
            <Route path='/new-post' element={<PostForm onAddPost={(newPost) => setPosts([...posts, newPost])} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
