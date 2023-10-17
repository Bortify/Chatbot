export const BACKEND_BASE_URL = process.env
  .NEXT_PUBLIC_DASHBOARD_BACKEND_BASE_URL
  ? `${process.env.NEXT_PUBLIC_DASHBOARD_BACKEND_BASE_URL}/`
  : 'http://localhost:8080/'
