import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'

type PostDetailProps = {
  posts: Post[]
  onDelete: (id: number) => void
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, onDelete }) => {
  const { t } = useTranslation('postdetail')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { theme } = useTheme()
  const post = posts.find((p) => p.id === Number(id))

  if (!post)
    return <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t('notFound')}</p>

  const handleDelete = () => {
    if (window.confirm(t('confirmDelete') || 'Bạn có chắc chắn muốn xóa bài viết này?')) {
      onDelete(post.id)
      navigate('/')
    }
  }

  return (
    <article
      className={`rounded-lg border p-6 shadow-md transition-colors duration-300 ${
        theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        {post.author} • {post.date.toLocaleDateString('vi-VN')}
      </p>
      <div className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{post.content}</div>
      <div className='mt-4 flex gap-2'>
        <Link
          to={`/edit-post/${post.id}`}
          className={`rounded px-4 py-2 transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          {t('edit')}
        </Link>
        <button
          onClick={handleDelete}
          className={`rounded px-4 py-2 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {t('delete')}
        </button>
      </div>
    </article>
  )
}

export default PostDetail
