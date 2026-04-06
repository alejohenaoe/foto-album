import { useState } from 'react'
import type { FormEvent } from 'react'

type LoginFormValues = {
  username: string
  password: string
}

const initialValues: LoginFormValues = {
  username: '',
  password: '',
}

export function LoginForm() {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialValues)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Reemplazar por integración real al endpoint de autenticación.
    console.info('Login submitted', formValues)
  }

  return (
    <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1.5" htmlFor="username">
        <span className="text-slate-700 text-sm font-medium">Usuario</span>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Tu usuario"
          required
          className="border border-slate-300 rounded-xl px-3.5 py-3 text-base text-slate-900 bg-white placeholder-slate-400 transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          value={formValues.username}
          onChange={(event) => {
            setFormValues((currentValues) => ({
              ...currentValues,
              username: event.target.value,
            }))
          }}
        />
      </label>

      <label className="flex flex-col gap-1.5" htmlFor="password">
        <span className="text-slate-700 text-sm font-medium">Contrasena</span>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Tu contrasena"
          required
          className="border border-slate-300 rounded-xl px-3.5 py-3 text-base text-slate-900 bg-white placeholder-slate-400 transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          value={formValues.password}
          onChange={(event) => {
            setFormValues((currentValues) => ({
              ...currentValues,
              password: event.target.value,
            }))
          }}
        />
      </label>

      <button className="mt-1.5 border-none rounded-xl bg-indigo-600 text-white text-sm font-semibold px-3.5 py-3 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-700 active:scale-95" type="submit">
        Iniciar sesion
      </button>
    </form>
  )
}
