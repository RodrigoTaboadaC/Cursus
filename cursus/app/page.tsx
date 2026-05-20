"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => router.push("/dashboard"), 1200)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Cursus</h1>
          <p className="text-sm text-gray-400 mt-1">Tu asistente académico inteligente</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-700 mb-4">Inicia sesión con tu cuenta USIL</p>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1.5">Correo institucional</label>
            <input
              type="email"
              defaultValue="cesar.taboada@usil.pe"
              className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 bg-gray-50"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-1.5">Contraseña</label>
            <input
              type="password"
              defaultValue="usil2026"
              className="w-full text-sm text-gray-800 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 bg-gray-50"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Ingresando...
              </>
            ) : "Ingresar"}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Universidad San Ignacio de Loyola · 2026
        </p>
      </div>
    </main>
  )
}