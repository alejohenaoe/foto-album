import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
