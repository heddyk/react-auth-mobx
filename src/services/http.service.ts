import axios from 'axios'

export const httpPrivate = axios.create({
  baseURL: 'http://api.syscon.com.br',
})

export const httpPublic = axios.create({
  baseURL: 'http://api.syscon.com.br',
})
