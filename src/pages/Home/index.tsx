import { observer } from 'mobx-react-lite'
import authStore from '../../stores/auth.store'

function Home() {
  return (
    <div>
      <h1>Bem vindo {authStore.user?.nome}</h1>
    </div>
  )
}

export default observer(Home)
