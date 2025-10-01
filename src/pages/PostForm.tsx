// src/pages/PostForm.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'

type PostFormProps = {
  onAddPost: (newPost: Post) => void
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const { t } = useTranslation('newpost')

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newPost: Post = {
      id: Date.now(),
      title,
      author,
      excerpt,
      content,
      date: new Date()
    }

    onAddPost(newPost)

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block font-medium'>{t('formTitle')}</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full rounded border px-3 py-2'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>{t('formAuthor')}</label>
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='w-full rounded border px-3 py-2'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>{t('formExcerpt')}</label>
        <input
          type='text'
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className='w-full rounded border px-3 py-2'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>{t('formContent')}</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full rounded border px-3 py-2'
          rows={5}
          required
        />
      </div>
      <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
        {t('submit')}
      </button>
    </form>
  )
}

export default PostForm
