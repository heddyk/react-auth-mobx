import { observer } from 'mobx-react-lite'
import { Navigate, Outlet } from 'react-router-dom'
import applicationStore from '../stores/application.store'

function PrivateRoute() {
  return applicationStore.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}

export default observer(PrivateRoute)
