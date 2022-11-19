import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div>
      <nav>
        <Link to="/inbox">inbox</Link>
        <Link to="/schedule">schedule</Link>
      </nav>
      <Outlet />
    </div>
  )
}
