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
        noPosts: 'No posts available',
        newPost: 'New Post'
      },
      postcard: en.postcard,
      postdetail: en.postdetail,
      about: en.about,
      newpost: en.newpost,
      editpostwrapper: en.editpostwrapper,
      common: en.common
    },
    vi: {
      translation: {
        home: 'Trang chủ',
        about: 'Giới thiệu',
        title: 'Blog đơn giản',
        noPosts: 'Không có bài viết nào',
        newPost: 'Bài viết mới'
      },
      postcard: vi.postcard,
      postdetail: vi.postdetail,
      about: vi.about,
      newpost: vi.newpost,
      editpostwrapper: vi.editpostwrapper,
      common: vi.common
    }
  },
  lng: 'vi',
  fallbackLng: 'en',
  ns: ['translation', 'newpost', 'common', 'postcard', 'postdetail', 'about', 'editpostwrapper'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
