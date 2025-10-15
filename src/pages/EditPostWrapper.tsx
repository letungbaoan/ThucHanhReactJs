import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../pages/PostForm'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadPostById } from '../store/postsSlice'

type EditPostWrapperProps = {
  onUpdatePost: (post: Post) => void | Promise<void>
}

const EditPostWrapper: React.FC<EditPostWrapperProps> = ({ onUpdatePost }) => {
  const { t } = useTranslation(['editpostwrapper', 'loading'])
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { posts, loading, error } = useAppSelector((state) => state.posts)

  const currentPost = posts.find((p) => p.id === id)

  useEffect(() => {
    if (!id) return

    if (!currentPost) {
      dispatch(loadPostById(id))
    }
  }, [id, dispatch, currentPost])

  if (loading && !currentPost) return <p>{t('loading:message')}</p>

  if (error || !currentPost) return <p>{error || t('editpostwrapper:notFound')}</p>

  return <PostForm initialPost={currentPost} onSubmit={onUpdatePost} />
}

export default EditPostWrapper
