import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
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

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'ApplicationStore',
      properties: ['acessToken', 'userId', 'workspaceId', 'userAccounts'],
      storage: window.localStorage,
      stringify: true,
    })
  }

  get currentUser() {
    if (this.userId) {
      return this.userAccounts[this.userId]
    }

    return undefined
  }

  get isAuthenticated(): boolean {
    return !!this.acessToken
  }

  async login({ codigo, login, senha }: LoginRequest) {
    const {
      data: { token, usuario },
    } = await httpPublic.post<LoginResponse>('/v1/login', {
      codigo,
      login,
      senha,
    })

    this.acessToken = token
    this.userId = usuario.id.toString()
    this.workspaceId = usuario.empresaConectada.empresaId.toString()
    this.userAccounts[usuario.id] = usuario
  }

  logout() {
    this.acessToken = undefined
    this.userId = undefined
    this.workspaceId = undefined
    this.userAccounts = {}
  }
}

const store = new ApplicationStore()

export default store
