import {
  FieldErrorsImpl,
  FieldValues,
  useForm,
  Controller,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { BaseSyntheticEvent } from 'react'
import authStore, { LoginRequest } from '../../stores/application.store'
import { useNavigate } from 'react-router-dom'
import LogoExse from '../../assets/logo.svg'

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
      lembrar: false,
    },
  })

  async function onSubmit(data: FieldValues) {
    try {
      await authStore.login(data as LoginRequest)
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
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 text-black dark:bg-slate-900 dark:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto w-12 h-auto"
          src={LogoExse}
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Conecte-se com sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <a href="/" className="font-medium text-cyan-500 hover:text-cyan-600">
            comece sua avaliação gratuita de 14 dias
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div>
              <label
                htmlFor="codigo"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Código
              </label>
              <div className="mt-1">
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
                      inputMode="numeric"
                      autoComplete="cc-number"
                      className="block w-full appearance-none rounded-md bg-transparent border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                      {...field}
                      onChange={(event) => {
                        field.onChange(normalizeNumber(event.target.value))
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="usuario"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Usuário
              </label>
              <div className="mt-1">
                <input
                  id="usuario"
                  type="usuario"
                  autoComplete="username"
                  className="block w-full appearance-none rounded-md bg-transparent border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  {...register('login', { required: true })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="senha"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full appearance-none rounded-md bg-transparent border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  {...register('senha', { required: true })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="lembrer"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  {...register('lembrar')}
                />
                <label htmlFor="lembre-se" className="ml-2 block text-sm">
                  Lembre-se de mim
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-cyan-600 hover:text-cyan-500"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:ring-offset-slate-900"
              >
                Conectar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
