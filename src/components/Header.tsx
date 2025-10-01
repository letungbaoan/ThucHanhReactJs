import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type HeaderProps = {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { t, i18n } = useTranslation()

  const toggleLang = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi'
    i18n.changeLanguage(newLang)
  }

  return (
    <header className='flex items-center justify-between bg-blue-600 p-4 text-white'>
      <h1 className='text-xl font-bold'>{title || t('title')}</h1>
      <nav className='space-x-4'>
        <Link to='/' className='hover:underline'>
          {t('home')}
        </Link>
        <Link to='/about' className='hover:underline'>
          {t('about')}
        </Link>
        <button
          onClick={toggleLang}
          className='ml-4 rounded bg-white px-2 py-1 text-sm font-medium text-blue-600 hover:bg-gray-200'
        >
          {i18n.language === 'vi' ? 'EN' : 'VI'}
        </button>
      </nav>
    </header>
  )
}

export default Header
