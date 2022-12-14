import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class ThemeStore {
  mode: 'light' | 'dark' = 'dark'

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'theme',
      properties: ['mode'],
      storage: window.localStorage,
      stringify: true,
    })
  }

  get isDark(): boolean {
    return this.mode === 'dark'
  }
}

const store = new ThemeStore()

export default store
