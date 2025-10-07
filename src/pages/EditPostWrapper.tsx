import { useParams } from 'react-router-dom'
import PostForm from './PostForm'
import type { Post } from '../components/PostCard'
import { useTranslation } from 'react-i18next'

type Props = {
  posts: Post[]
  onUpdatePost: (post: Post) => void
}

const EditPostWrapper: React.FC<Props> = ({ posts, onUpdatePost }) => {
  const { t } = useTranslation('editpostwrapper')
  const { id } = useParams<{ id: string }>()
  const post = posts.find((p) => p.id === Number(id))

  if (!post) return <p>{t('notFound')}</p>

  return <PostForm initialPost={post} onSubmit={onUpdatePost} />
}

export default EditPostWrapper
