import React from 'react'
import { useTranslation } from 'react-i18next'

const About: React.FC = () => {
  const { t } = useTranslation('about')
  return (
    <div className='rounded-lg border bg-white p-6 shadow-md'>
      <h2 className='text-xl font-bold'>{t('title')}</h2>
      <p className='mt-2 text-gray-700'>{t('content')}</p>
    </div>
  )
}

export default About
