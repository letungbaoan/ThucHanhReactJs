import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

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
  const { theme } = useTheme()

  const safeTitle = typeof post.title === 'string' && post.title.trim() ? post.title : t('noTitle')
  const safeAuthor = typeof post.author === 'string' && post.author.trim() ? post.author : t('unknownAuthor')
  const safeDate = (() => {
    const d = new Date(post.date)
    return d instanceof Date && !isNaN(d.getTime()) ? d.toLocaleDateString('vi-VN') : t('noDate')
  })()
  const safeExcerpt = typeof post.excerpt === 'string' && post.excerpt.trim() ? post.excerpt : t('noExcerpt')

  return (
    <div
      className={`rounded-lg border p-4 shadow-md transition-colors duration-300 ${
        theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      <h2 className='text-lg font-semibold'>{safeTitle}</h2>
      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        {safeAuthor} • {safeDate}
      </p>
      <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{safeExcerpt}</p>
      <Link
        to={`/post/${post.id}`}
        className={`mt-3 inline-block rounded px-4 py-2 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {t('readMore')}
      </Link>
    </div>
  )
}

export default PostCard
