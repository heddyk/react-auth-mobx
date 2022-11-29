import {
  FieldErrorsImpl,
  FieldValues,
  useForm,
  Controller,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { BaseSyntheticEvent } from 'react'
import authStore, { LoginRequest } from '../../stores/auth.store'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  codigo: z.number(),
  login: z.string().min(1),
  senha: z.string().min(1, {
    message: 'asdf',
  }),
})

const normalizeNumber = (value?: string): string | number => {
  if (!value) return ''

  return parseInt(value.replace(/[^\d]/g, ''))
}

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      codigo: '',
      login: '',
      senha: '',
    },
  })

  async function onSubmit(data: FieldValues) {
    try {
      await authStore.login(data as LoginRequest)
      navigate('/inbox')
    } catch (error) {
      console.log(error)
    }
  }

  function onError(
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>,
    event: BaseSyntheticEvent<object> | undefined
  ) {
    console.log(errors)
    console.log(event)
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3"
      >
        <label htmlFor="codigo">Código</label>
        <Controller
          name="codigo"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <input
              id="codigo"
              type="tel"
              className="border border-gray-500 rounded"
              placeholder="Código. 00000000"
              inputMode="numeric"
              autoComplete="cc-number"
              {...field}
              onChange={(event) => {
                field.onChange(normalizeNumber(event.target.value))
              }}
            />
          )}
        />

        <label htmlFor="login">Usuário</label>
        <input
          type="text"
          className="border border-gray-500 rounded"
          placeholder="Usuário"
          {...register('login', { required: true })}
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="text"
          className="border border-gray-500 rounded"
          placeholder="Senha"
          {...register('senha', { required: true })}
        />

        <button type="submit">Conectar</button>
      </form>
    </div>
  )
}
