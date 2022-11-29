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
  usuario: User
}

class AuthStore {
  acessToken?: string
  refreshToken?: string
  user?: User

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['acessToken', 'refreshToken', 'user'],
      storage: window.localStorage,
      stringify: true,
    })
  }

  async login({ codigo, login, senha }: LoginRequest) {
    const {
      data: { token, tokenRefresh, usuario },
    } = await httpPublic.post<LoginResponse>('/v1/login', {
      codigo,
      login,
      senha,
    })

    this.acessToken = token
    this.refreshToken = tokenRefresh
    this.user = usuario
  }
}

const store = new AuthStore()

export default store
