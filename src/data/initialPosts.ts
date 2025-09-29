import type { Post } from '../components/PostCard'

export const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Bắt đầu với React và TypeScript',
    author: 'Nguyễn Văn A',
    date: new Date('2025-09-29'),
    excerpt: 'React kết hợp với TypeScript giúp code dễ bảo trì hơn...',
    content: 'Nội dung chi tiết bài viết về việc sử dụng React cùng TypeScript để xây dựng ứng dụng web...'
  },
  {
    id: 2,
    title: 'TailwindCSS cơ bản',
    author: 'Trần Thị B',
    date: new Date('2025-09-28'),
    excerpt: 'TailwindCSS là một utility-first CSS framework...',
    content: 'Nội dung chi tiết bài viết về cách sử dụng TailwindCSS để tạo giao diện nhanh chóng và dễ tùy biến...'
  }
]
