import { makeAutoObservable } from 'mobx'
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
  }

  async login({ codigo, login, senha }: LoginRequest) {
    const {
      data: { token, tokenRefresh, usuario },
    } = await httpPublic.post<LoginResponse>('/v1/login', {
      codigo,
      login,
      senha,
    })

    console.log(token, tokenRefresh, usuario)
  }
}

const store = new AuthStore()

export default store
