"use client"
import { useState, useEffect, useCallback } from "react"
import Sidebar from "@/components/Sidebar"

type Estado = "inicio" | "jugando" | "resultado"
type Pregunta = { pregunta: string; respuesta: string; opciones: string[] }

const TOTAL = 8
const TIEMPO = 15

const banco: Pregunta[] = [
  { pregunta: "¿Cuántas capas tiene el modelo OSI?", respuesta: "7", opciones: ["5", "4", "7", "9"] },
  { pregunta: "¿Qué significa IP?", respuesta: "Internet Protocol", opciones: ["Internet Protocol", "Internal Process", "Input Port", "Interface Program"] },
  { pregunta: "¿Qué protocolo asigna direcciones IP automáticamente?", respuesta: "DHCP", opciones: ["DNS", "FTP", "DHCP", "HTTP"] },
  { pregunta: "¿Cuál es el puerto por defecto de HTTP?", respuesta: "80", opciones: ["21", "443", "80", "25"] },
  { pregunta: "¿Qué dispositivo conecta redes diferentes entre sí?", respuesta: "Router", opciones: ["Switch", "Hub", "Router", "Repetidor"] },
  { pregunta: "¿Qué significa DNS?", respuesta: "Domain Name System", opciones: ["Domain Name System", "Data Network Service", "Digital Node Server", "Direct Net Switch"] },
  { pregunta: "¿Qué protocolo traduce nombres de dominio a IPs?", respuesta: "DNS", opciones: ["DHCP", "FTP", "DNS", "ARP"] },
  { pregunta: "¿Qué significa LAN?", respuesta: "Local Area Network", opciones: ["Large Area Node", "Local Area Network", "Linked Access Net", "Long Area Network"] },
]

function elegirPreguntas(): Pregunta[] {
  const mezclado = [...banco].sort(() => Math.random() - 0.5)
  return mezclado.slice(0, TOTAL)
}

export default function Minijuegos() {
  const [estado, setEstado] = useState<Estado>("inicio")
  const [preguntas] = useState<Pregunta[]>(elegirPreguntas)
  const [actual, setActual] = useState(0)
  const [seleccionada, setSeleccionada] = useState<string | null>(null)
  const [correctas, setCorrectas] = useState(0)
  const [tiempo, setTiempo] = useState(TIEMPO)
  const [respondidas, setRespondidas] = useState<("correcta" | "incorrecta" | null)[]>(Array(TOTAL).fill(null))

  const siguiente = useCallback((sel: string | null) => {
    const esCor = sel === preguntas[actual].respuesta
    setRespondidas(prev => { const n = [...prev]; n[actual] = esCor ? "correcta" : "incorrecta"; return n })
    if (esCor) setCorrectas(p => p + 1)
    setTimeout(() => {
      if (actual + 1 >= TOTAL) setEstado("resultado")
      else { setActual(p => p + 1); setSeleccionada(null); setTiempo(TIEMPO) }
    }, 700)
  }, [actual, preguntas])

  useEffect(() => {
    if (estado !== "jugando" || seleccionada !== null) return
    if (tiempo === 0) { siguiente(null); return }
    const t = setTimeout(() => setTiempo(p => p - 1), 1000)
    return () => clearTimeout(t)
  }, [tiempo, estado, seleccionada, siguiente])

  const pct = Math.round((correctas / TOTAL) * 100)
  const p = preguntas[actual]

  const colorBoton = (op: string) => {
    if (seleccionada === null) return "bg-white border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50"
    if (op === p.respuesta) return "bg-green-50 border-green-400 text-green-700"
    if (op === seleccionada) return "bg-red-50 border-red-400 text-red-600"
    return "bg-white border-gray-100 text-gray-300"
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Minijuegos</h1>
          <p className="text-sm text-gray-400 mt-1">Activa tu cerebro antes de estudiar</p>
        </div>

        {estado === "inicio" && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📡</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Redes y Telecomunicaciones</h2>
              <p className="text-sm text-gray-400 mb-6">8 preguntas del curso · 15 segundos por pregunta · Refuerza los conceptos clave</p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xl font-semibold text-gray-900">8</p>
                  <p className="text-xs text-gray-400 mt-0.5">Preguntas</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xl font-semibold text-gray-900">15s</p>
                  <p className="text-xs text-gray-400 mt-0.5">Por pregunta</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xl font-semibold text-gray-900">12</p>
                  <p className="text-xs text-gray-400 mt-0.5">En el banco</p>
                </div>
              </div>
              <button onClick={() => setEstado("jugando")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
                Empezar juego
              </button>
            </div>
          </div>
        )}

        {estado === "jugando" && (
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-4">
              {respondidas.map((r, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${
                  r === "correcta" ? "bg-green-400" :
                  r === "incorrecta" ? "bg-red-400" :
                  i === actual ? "bg-blue-400" : "bg-gray-200"}`} />
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium text-gray-400">{actual + 1} de {TOTAL}</span>
                <div className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${
                  tiempo <= 5 ? "bg-red-100 text-red-500" : "bg-blue-50 text-blue-600"}`}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {tiempo}s
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Selecciona la respuesta correcta</p>
                <p className="text-lg font-semibold text-gray-900 leading-snug">{p.pregunta}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {p.opciones.map((op, i) => (
                  <button key={i}
                    onClick={() => { if (seleccionada !== null) return; setSeleccionada(op); siguiente(op) }}
                    className={`border-2 rounded-xl py-3 px-2 text-sm font-medium transition-all duration-200 ${colorBoton(op)}`}>
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs text-gray-400">Correctas</span>
              <span className="text-sm font-semibold text-green-600">{correctas} / {actual}</span>
            </div>
          </div>
        )}

        {estado === "resultado" && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center mb-4">
              <div className="text-5xl mb-4">
                {pct >= 80 ? "🏆" : pct >= 50 ? "💪" : "📚"}
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {pct >= 80 ? "¡Excelente!" : pct >= 50 ? "¡Buen intento!" : "Sigue practicando"}
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                {pct >= 80 ? "Dominas los conceptos de Redes" : pct >= 50 ? "Vas por buen camino" : "Repasa los conceptos e inténtalo de nuevo"}
              </p>

              <div className="w-28 h-28 mx-auto mb-6 relative">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F3F4F6" strokeWidth="3"/>
                  <circle cx="18" cy="18" r="15.9" fill="none"
                    stroke={pct >= 80 ? "#22C55E" : pct >= 50 ? "#F59E0B" : "#EF4444"}
                    strokeWidth="3" strokeDasharray={`${pct} 100`} strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl font-bold text-gray-900">{pct}%</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-2xl font-semibold text-green-600">{correctas}</p>
                  <p className="text-xs text-green-500 mt-0.5">Correctas</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-2xl font-semibold text-red-500">{TOTAL - correctas}</p>
                  <p className="text-xs text-red-400 mt-0.5">Incorrectas</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-2xl font-semibold text-blue-600">{TOTAL}</p>
                  <p className="text-xs text-blue-400 mt-0.5">Total</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => window.location.reload()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
                  Jugar de nuevo
                </button>
                <a href="/dashboard"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center">
                  Ir al dashboard
                </a>
              </div>
            </div>

            {pct >= 80 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-amber-800">🔥 ¡Racha extendida a 8 días!</p>
                <p className="text-xs text-amber-600 mt-0.5">Vuelve mañana para mantenerla</p>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}