import { observer } from 'mobx-react-lite'
import authStore from '../../stores/application.store'

function Home() {
  return (
    <div>
      <h1>Bem vindo {authStore.currentUser?.nome}</h1>
    </div>
  )
}

export default observer(Home)
