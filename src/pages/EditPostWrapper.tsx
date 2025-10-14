import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from './PostForm'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'
import { getPostById } from '../services/postService'
import axios from 'axios'

type Props = {
  onUpdatePost: (post: Post) => void
}

const EditPostWrapper: React.FC<Props> = ({ onUpdatePost }) => {
  const { t } = useTranslation(['editpostwrapper', 'loading'])
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return
      setLoading(true)
      try {
        const data = await getPostById(id)
        setPost(data)
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.message === 'Network Error') {
            setError(t('editpostwrapper:networkError'))
          } else if (err.response?.status === 404) {
            setError(t('editpostwrapper:notFound'))
          } else {
            setError(t('editpostwrapper:loadError'))
          }
        } else {
          setError(t('editpostwrapper:loadError'))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, t])

  if (loading) return <p>{t('loading:message')}</p>
  if (error || !post) return <p>{error || t('editpostwrapper:notFound')}</p>

  return <PostForm initialPost={post} onSubmit={onUpdatePost} />
}

export default EditPostWrapper
