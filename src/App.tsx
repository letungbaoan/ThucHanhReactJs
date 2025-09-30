import React from 'react'
import Header from './components/Header'
import PostCard from './components/PostCard'
import { initialPosts } from './data/initialPosts'
import { useTranslation } from 'react-i18next'

const App: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header title='Simple Blog' />

      <main className='mx-auto grid max-w-3xl gap-6 p-6'>
        {initialPosts.length > 0 ? (
          initialPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className='text-center text-gray-500'>{t('noPosts')}</p>
        )}
      </main>
    </div>
  )
}

export default App
