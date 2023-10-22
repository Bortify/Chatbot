export const BACKEND_BASE_URL = process.env
  .NEXT_PUBLIC_DASHBOARD_BACKEND_BASE_URL
  ? `${process.env.NEXT_PUBLIC_DASHBOARD_BACKEND_BASE_URL}/`
  : 'http://localhost:8080/'

export const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_DAHBOARD_BASE_URL
  ? `${process.env.NEXT_PUBLIC_DAHBOARD_BASE_URL}/`
  : 'http://localhost:3000/'

export const CHATFRONT_BUNDLE = process.env.NEXT_PUBLIC_CHATFRONT_URL || 'http://localhost:5173/index.js'