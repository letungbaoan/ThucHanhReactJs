import { useTranslation } from 'react-i18next'

export interface Post {
  id: number
  title: string
  author: string
  date: Date
  excerpt: string
  content: string
}

export interface PostRaw extends Omit<Post, 'date'> {
  date: string
}

type PostCardProps = {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const { t } = useTranslation('postcard')

  const safeTitle = typeof post.title === 'string' && post.title.trim() ? post.title : t('noTitle')

  const safeAuthor = typeof post.author === 'string' && post.author.trim() ? post.author : t('unknownAuthor')

  const safeDate = (() => {
    const d = new Date(post.date)
    return d instanceof Date && !isNaN(d.getTime()) ? d.toLocaleDateString('vi-VN') : t('noDate')
  })()

  const safeExcerpt = typeof post.excerpt === 'string' && post.excerpt.trim() ? post.excerpt : t('noExcerpt')

  return (
    <div className='rounded-lg border bg-white p-4 shadow-md'>
      <h2 className='text-lg font-semibold'>{safeTitle}</h2>
      <p className='text-sm text-gray-500'>
        {safeAuthor} • {safeDate}
      </p>
      <p className='mt-2 text-gray-700'>{safeExcerpt}</p>
      <button className='mt-3 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>{t('readMore')}</button>
    </div>
  )
}

export default PostCard
