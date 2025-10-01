import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import PostCard, { type PostRaw, type Post } from './components/PostCard'
import { initialPosts } from './data/initialPosts'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'blogPosts'

const App: React.FC = () => {
  const { t } = useTranslation()

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
    <div className='min-h-screen bg-gray-100'>
      <Header title='Simple Blog' />

      <main className='mx-auto grid max-w-3xl gap-6 p-6'>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className='text-center text-gray-500'>{t('noPosts')}</p>
        )}
      </main>
    </div>
  )
}

export default App
