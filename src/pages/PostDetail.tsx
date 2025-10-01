import React from 'react'
import { useParams } from 'react-router-dom'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'

type PostDetailProps = {
  posts: Post[]
}

const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
  const { t } = useTranslation('postdetail')
  const { id } = useParams<{ id: string }>()
  const post = posts.find((p) => p.id === Number(id))

  if (!post) return <p>{t('notFound')}</p>

  return (
    <article className='rounded-lg border bg-white p-6 shadow-md'>
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <p className='text-sm text-gray-500'>
        {post.author} • {post.date.toLocaleDateString('vi-VN')}
      </p>
      <div className='mt-4 text-gray-700'>{post.content}</div>
    </article>
  )
}

export default PostDetail
