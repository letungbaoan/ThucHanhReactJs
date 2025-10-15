import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadPostById, removePost } from '../store/postsSlice'

const PostDetail: React.FC = () => {
  const { t } = useTranslation(['postdetail', 'loading'])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const { posts, loading, error } = useAppSelector((state) => state.posts)

  const post = posts.find((p) => p.id === id)

  useEffect(() => {
    if (id && !post) {
      dispatch(loadPostById(id))
    }
  }, [id, post, dispatch])

  const handleDelete = async () => {
    if (!id) return
    if (window.confirm(t('confirmDelete'))) {
      await dispatch(removePost(id))
      navigate('/')
    }
  }

  if (loading)
    return (
      <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t('loading:message')}</p>
    )

  if (error || !post)
    return (
      <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{error || t('notFound')}</p>
    )

  return (
    <article
      className={`rounded-lg border p-6 shadow-md transition-colors duration-300 ${
        theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        {post.author} • {new Date(post.date).toLocaleDateString('vi-VN')}
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
