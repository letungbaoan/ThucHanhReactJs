import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import vi from './locales/vi.json'
import en from './locales/en.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: 'Home',
        about: 'About',
        title: 'Simple Blog',
        noPosts: 'No posts available'
      },
      postcard: en.postcard,
      postdetail: en.postdetail,
      about: en.about
    },
    vi: {
      translation: {
        home: 'Trang chủ',
        about: 'Giới thiệu',
        title: 'Blog đơn giản',
        noPosts: 'Không có bài viết nào'
      },
      postcard: vi.postcard,
      postdetail: vi.postdetail,
      about: vi.about
    }
  },
  lng: 'vi',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
