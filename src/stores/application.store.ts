import { autorun, makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { redirect } from 'react-router-dom'
import { httpPublic } from '../services/http.service'

export interface User {
  id: number
  nome: string
  situacao: boolean
}

export interface LoginRequest {
  codigo: number
  login: string
  senha: string
  lembrar: boolean
}

export interface LoginResponse {
  token: string
  tokenRefresh: string
  usuario: any
}

class ApplicationStore {
  acessToken?: string
  userId?: string
  workspaceId?: string
  userAccounts: Record<string, User> = {}
  mode: 'light' | 'dark' = 'dark'

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'ApplicationStore',
      properties: ['acessToken', 'userId', 'workspaceId', 'userAccounts'],
      storage: window.localStorage,
      stringify: true,
    })

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

  get isAuthenticated(): boolean {
    return !!this.acessToken
  }

  async login({ codigo, login, senha, lembrar }: LoginRequest) {
    const {
      data: { token, usuario },
    } = await httpPublic.post<LoginResponse>('/v1/login', {
      codigo,
      login,
      senha,
    })

    if (lembrar) {
      this.acessToken = token
    }

    this.userId = usuario.id.toString()
    this.workspaceId = usuario.empresaConectada.empresaId.toString()
    this.userAccounts[usuario.id] = usuario
  }
}

const store = new ApplicationStore()

export default store
