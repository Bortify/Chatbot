export const BACKEND_BASE_URL = process.env
  .NEXT_PUBLIC_DASHBOARD_BACKEND_BASE_URL
  ? `${process.env.NEXT_PUBLIC_DASHBOARD_BACKEND_BASE_URL}/`
  : 'http://localhost:8080/'

export const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_DAHBOARD_BASE_URL
  ? `${process.env.NEXT_PUBLIC_DAHBOARD_BASE_URL}/`
  : 'http://localhost:3000/'
