import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from 'react-router-dom'
import { Layout } from './components/Layout'
import NoMatch from './pages/NoMatch'
import Login from './pages/Login'
import Register from './pages/Register'
import Inbox from './pages/Inbox'
import Schedule from './pages/Schedule'

const routes: RouteObject[] = [
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
]

export const router = createBrowserRouter(routes)
