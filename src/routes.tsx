import { lazy, Suspense } from 'react'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  type RouteObject,
} from 'react-router-dom'

const Layout = lazy(() => import('./components/Layout'))
const NoMatch = lazy(() => import('./pages/NoMatch'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Inbox = lazy(() => import('./pages/Inbox'))
const Schedule = lazy(() => import('./pages/Schedule'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<>...</>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            index: true,
            element: <Navigate to="/inbox" replace={true} />,
          },
          { path: '/inbox', index: true, element: <Inbox /> },
          { path: '/schedule', element: <Schedule /> },
        ],
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
