import React from 'react'
import PostCard, { type Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'

type HomeProps = {
  posts: Post[]
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const { t } = useTranslation()

  if (posts.length === 0) {
    return <p className='text-center text-gray-500'>{t('noPosts')}</p>
  }

  return (
    <div className='grid gap-6'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Home
