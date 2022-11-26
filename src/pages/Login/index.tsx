import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  codigo: z.number(),
  login: z.string(),
  senha: z.string(),
})

export default function Login() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any, e: any) => console.log(data, e)
  const onError = (errors: any, e: any) => console.log(errors, e)

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3"
      >
        <label htmlFor="codigo">Código</label>
        <input
          type="number"
          className="border border-gray-500 rounded"
          placeholder="Código"
          {...register('codigo', { required: true, valueAsNumber: true })}
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
