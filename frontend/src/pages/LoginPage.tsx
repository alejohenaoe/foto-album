import { LoginForm } from '../components/auth/LoginForm'

export function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6 bg-[radial-gradient(circle_at_top_right,_#c7d2fe_0%,_transparent_40%),radial-gradient(circle_at_bottom_left,_#bfdbfe_0%,_transparent_45%),#f8fafc]">
      <section className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/8 p-7 sm:p-5" aria-labelledby="login-title">
        <header className="mb-5">
          <p className="m-0 mb-2 text-indigo-600 font-semibold text-sm">Foto Album</p>
          <h1 id="login-title" className="m-0 text-slate-900 text-2xl">Iniciar sesion</h1>
        </header>

        <LoginForm />
      </section>
    </main>
  )
}
