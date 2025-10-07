import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'

type PostDetailProps = {
  posts: Post[]
  onDelete: (id: number) => void
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, onDelete }) => {
  const { t } = useTranslation('postdetail')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const post = posts.find((p) => p.id === Number(id))

  if (!post) return <p>{t('notFound')}</p>

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      onDelete(post.id)
      navigate('/')
    }
  }

  return (
    <article className='rounded-lg border bg-white p-6 shadow-md'>
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <p className='text-sm text-gray-500'>
        {post.author} • {post.date.toLocaleDateString('vi-VN')}
      </p>
      <div className='mt-4 text-gray-700'>{post.content}</div>
      <div className='mt-4 flex gap-2'>
        <Link to={`/edit-post/${post.id}`} className='rounded bg-yellow-500 px-4 py-2 text-white'>
          {t('edit')}
        </Link>
        <button onClick={handleDelete} className='rounded bg-red-600 px-4 py-2 text-white'>
          {t('delete')}
        </button>
      </div>
    </article>
  )
}

export default PostDetail
