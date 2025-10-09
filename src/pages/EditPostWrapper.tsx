import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from './PostForm'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'
import { getPostById } from '../services/postService'

type Props = {
  onUpdatePost: (post: Post) => void
}

const EditPostWrapper: React.FC<Props> = ({ onUpdatePost }) => {
  const { t } = useTranslation('editpostwrapper')
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
      } catch {
        setError(t('notFound'))
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  if (loading) return <p>{t('loading:message')}</p>
  if (error || !post) return <p>{error || t('notFound')}</p>

  return <PostForm initialPost={post} onSubmit={onUpdatePost} />
}

export default EditPostWrapper
