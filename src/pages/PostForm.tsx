import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useTheme } from '../context/ThemeContext'

type PostFormProps = {
  onSubmit: (post: Post) => void
  initialPost?: Post
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialPost }) => {
  const [title, setTitle] = useState(initialPost?.title ?? '')
  const [author, setAuthor] = useState(initialPost?.author ?? '')
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? '')
  const [content, setContent] = useState(initialPost?.content ?? '')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { t } = useTranslation(['newpost', 'common'])
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    if (!title.trim()) newErrors.title = t('titleRequired')
    if (!author.trim()) newErrors.author = t('authorRequired')
    if (!excerpt.trim()) newErrors.excerpt = t('excerptRequired')
    if (!content.trim()) newErrors.content = t('contentRequired')

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    try {
      const newPost: Post = {
        id: initialPost ? initialPost.id : String(Date.now()),
        title: title.trim(),
        author: author.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        date: initialPost ? initialPost.date : new Date().toISOString()
      }

      onSubmit(newPost)

      navigate(initialPost ? `/post/${newPost.id}` : '/')
    } catch {
      toast.error(t('common:error'))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-lg border p-6 shadow-md transition-colors duration-300 ${
        theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      <div>
        <label className='block font-medium'>{t('formTitle')}</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full rounded border px-3 py-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.title && <p className='text-sm text-red-400'>{errors.title}</p>}
      </div>

      <div>
        <label className='block font-medium'>{t('formAuthor')}</label>
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`w-full rounded border px-3 py-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.author && <p className='text-sm text-red-400'>{errors.author}</p>}
      </div>

      <div>
        <label className='block font-medium'>{t('formExcerpt')}</label>
        <input
          type='text'
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={`w-full rounded border px-3 py-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
        {errors.excerpt && <p className='text-sm text-red-400'>{errors.excerpt}</p>}
      </div>

      <div>
        <label className='block font-medium'>{t('formContent')}</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full rounded border px-3 py-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'
          }`}
          rows={5}
        />
        {errors.content && <p className='text-sm text-red-400'>{errors.content}</p>}
      </div>

      <button
        type='submit'
        className={`rounded px-4 py-2 text-white transition-colors duration-200 ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {initialPost ? t('update') : t('submit')}
      </button>
    </form>
  )
}

export default PostForm
