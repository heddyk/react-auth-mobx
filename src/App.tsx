import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import applicationStore from './stores/application.store'
import { clsx } from 'clsx'

function App() {
  const classNames = clsx(
    'h-screen w-screen',
    applicationStore.isDark && 'dark'
  )

  return (
    <div role="application" className={classNames}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
