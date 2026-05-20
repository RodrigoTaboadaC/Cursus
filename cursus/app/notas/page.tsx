"use client"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"

type Eval = { id: string; nombre: string; pesoEfectivo: number; nota: string; fecha: string; esFinal: boolean }
type Curso = { id: number; nombre: string; creditos: number; evals: Eval[]; listo: boolean }

function parsearTabla(texto: string): Eval[] {
  const lineas = texto.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  const resultado: Eval[] = []

  let pesoPermanente = 100

  // Primero buscar el peso del bloque permanente
  for (const linea of lineas) {
    const partes = linea.split('\t')
    const nombre = partes[0]?.trim().toLowerCase() ?? ''
    const pesoRaw = partes[2]?.trim() ?? partes[1]?.trim() ?? ''
    const peso = parseFloat(pesoRaw.replace('%', '').trim()) || 0

    if (nombre.includes('permanente') || nombre.includes('continua')) {
      pesoPermanente = peso
      break
    }
  }

  for (const linea of lineas) {
    const partes = linea.split('\t')
    const nombre = partes[0]?.trim() ?? ''
    const notaRaw = partes[1]?.trim() ?? '-'
    const pesoRaw = partes[2]?.trim() ?? partes[1]?.trim() ?? ''
    const fecha = partes[3]?.trim() ?? ''
    const peso = parseFloat(pesoRaw.replace('%', '').trim()) || 0
    const nota = (notaRaw === '-' || notaRaw === '--' || notaRaw === '') ? '' : notaRaw

    const nomLow = nombre.toLowerCase()

    // Ignorar filas contenedoras o resumen
    if (
      nomLow === 'promedio' ||
      nomLow.includes('reclamo') ||
      nomLow.includes('promedio de evaluac') ||
      nomLow.includes('permanente') ||
      nomLow.includes('continua') ||
      peso === 0 ||
      peso === 100
    ) continue

    const esFinal = nomLow.includes('final') || nomLow.includes('examen final')

    // Calcular peso efectivo
    let pesoEfectivo: number
    if (esFinal) {
      pesoEfectivo = peso // el final ya tiene su peso real (ej: 30%)
    } else {
      pesoEfectivo = (pesoPermanente / 100) * peso // ej: 70% * 35% = 24.5%
    }

    resultado.push({
      id: Math.random().toString(36).substr(2, 8),
      nombre,
      pesoEfectivo: parseFloat(pesoEfectivo.toFixed(2)),
      nota,
      fecha: (fecha === '--' || fecha === '') ? '' : fecha,
      esFinal,
    })
  }

  return resultado
}

function calcular(evals: Eval[], objetivo: number) {
  const sinFinal = evals.filter(e => !e.esFinal && e.nota !== '')
  const final = evals.find(e => e.esFinal)
  const sumaParcial = sinFinal.reduce((acc, e) => acc + parseFloat(e.nota) * e.pesoEfectivo / 100, 0)
  const necesitaFinal = final ? (objetivo - sumaParcial) / (final.pesoEfectivo / 100) : null
  const pesoCubierto = sinFinal.reduce((acc, e) => acc + e.pesoEfectivo, 0)
  const promedioActual = pesoCubierto > 0 ? sumaParcial : null
  return { sumaParcial, necesitaFinal, promedioActual, final }
}

const cursosBase: Curso[] = [
  { id: 1, nombre: "Agentes Inteligentes", creditos: 4, evals: [], listo: false },
  { id: 2, nombre: "Oportunidades de Negocio", creditos: 3, evals: [], listo: false },
  { id: 3, nombre: "Gerenciamiento de Datos II", creditos: 4, evals: [], listo: false },
  { id: 4, nombre: "Estructuras de Datos", creditos: 4, evals: [], listo: false },
  { id: 5, nombre: "Redes y Telecomunicaciones", creditos: 3, evals: [], listo: false },
  { id: 6, nombre: "Cultural Transformation", creditos: 3, evals: [], listo: false },
]

export default function Notas() {
  const [cursos, setCursos] = useState<Curso[]>(cursosBase)
  const [seleccionado, setSeleccionado] = useState<number | null>(null)
  const [texto, setTexto] = useState("")
  const [objetivo, setObjetivo] = useState(11)

  const curso = cursos.find(c => c.id === seleccionado)

  const evaluar = (cId: number) => {
    const evals = parsearTabla(texto)
    setCursos(prev => prev.map(c => c.id === cId ? { ...c, evals, listo: evals.length > 0 } : c))
    setTexto("")
  }

  const actualizarNota = (cId: number, eId: string, val: string) => {
    setCursos(prev => prev.map(c => c.id === cId 
      ? { ...c, evals: c.evals.map(e => e.id === eId ? { ...e, nota: val } : e) } 
      : c))
  }

  const limpiar = (cId: number) => {
    setCursos(prev => prev.map(c => c.id === cId ? { ...c, evals: [], listo: false } : c))
  }

  const colorNota = (n: number) => n >= 15 ? "text-green-600" : n >= 11 ? "text-amber-500" : "text-red-500"

  const promedioGeneral = () => {
    let sp = 0, st = 0
    cursos.forEach(c => {
      if (c.listo) {
        const { promedioActual } = calcular(c.evals, objetivo)
        if (promedioActual != null) { st += promedioActual * c.creditos; sp += c.creditos }
      }
    })
    return sp > 0 ? (st / sp).toFixed(2) : "—"
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Mis notas</h1>
          <p className="text-sm text-gray-400 mt-1">Pega tu tabla de infosil USIL y calcula cuánto necesitas en el final</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-xs text-green-500 mb-1">Promedio ponderado</p>
            <p className="text-2xl font-semibold text-green-600">{promedioGeneral()}</p>
            <p className="text-xs text-green-400 mt-1">Cursos con notas ingresadas</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs text-blue-400 mb-1">Cursos este ciclo</p>
            <p className="text-2xl font-semibold text-blue-600">{cursos.length}</p>
            <p className="text-xs text-blue-400 mt-1">{cursos.reduce((a, c) => a + c.creditos, 0)} créditos en total</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-xs text-amber-600 mb-2">Nota objetivo para el final</p>
            <div className="flex items-center gap-3">
              <input type="range" min="11" max="20" step="1" value={objetivo}
                onChange={e => setObjetivo(parseInt(e.target.value))} className="flex-1" />
              <span className="text-xl font-semibold text-amber-600 w-6">{objetivo}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {/* Lista de cursos */}
          <div className="flex flex-col gap-3">
            {cursos.map(c => {
              const res = c.listo ? calcular(c.evals, objetivo) : null
              const activo = seleccionado === c.id
              return (
                <div key={c.id} onClick={() => setSeleccionado(activo ? null : c.id)}
                  className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${activo ? "border-blue-300 shadow-sm" : "border-gray-100 hover:border-gray-200"}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold text-gray-900">{c.nombre}</p>
                    <span className="text-xs text-gray-400">{c.creditos} créditos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {res?.promedioActual != null ? (
                      <span className={`text-xs font-semibold ${colorNota(res.promedioActual)}`}>
                        Acumulado: {res.promedioActual.toFixed(1)} pts
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">{c.listo ? "Sin notas aún" : "Pega tu tabla →"}</span>
                    )}
                    {res?.necesitaFinal != null && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        res.necesitaFinal <= 0 ? "bg-green-100 text-green-700" :
                        res.necesitaFinal <= 14 ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-600"}`}>
                        {res.necesitaFinal <= 0 ? "Ya aprobaste 🎉" : 
                         res.necesitaFinal > 20 ? "No es posible" : 
                         `Final ≥ ${Math.ceil(res.necesitaFinal).toString()}`}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Panel derecho */}
          {curso ? (
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-900 mb-4">{curso.nombre}</p>

              {!curso.listo ? (
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium">¿Cómo pegar?</p>
                  <ol className="text-xs text-gray-400 mb-3 space-y-1 list-decimal list-inside">
                    <li>Entra a Infosil USIL y abre las notas del curso</li>
                    <li>Selecciona toda la tabla con el mouse</li>
                    <li>Copia con Ctrl+C</li>
                    <li>Pega abajo con Ctrl+V y presiona Evaluar</li>
                  </ol>
                  <textarea
                    rows={9}
                    placeholder={"Pega aquí tu tabla de notas..."}
                    value={texto}
                    onChange={e => setTexto(e.target.value)}
                    className="w-full text-xs text-gray-800 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400 font-mono resize-none"
                  />
                  <button onClick={() => evaluar(curso.id)}
                    disabled={texto.trim() === ""}
                    className="mt-2 w-full bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                    Evaluar
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col gap-2 mb-4">
                    {curso.evals.map(e => (
                      <div key={e.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${e.esFinal ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800">{e.nombre}</p>
                          <p className="text-xs text-gray-400">
                            Peso: {e.pesoEfectivo}%{e.fecha ? ` · ${e.fecha}` : ''}
                          </p>
                        </div>
                        {e.esFinal ? (
                          <span className="text-xs bg-blue-100 text-blue-500 px-2 py-1 rounded-lg whitespace-nowrap">se calcula</span>
                        ) : (
                          <input
                            type="number" min="0" max="20" step="1"
                            placeholder="—"
                            value={e.nota}
                            onChange={ev => actualizarNota(curso.id, e.id, ev.target.value)}
                            className="w-16 text-sm text-center text-gray-900 font-medium border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400"                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {(() => {
                    const { sumaParcial, necesitaFinal, final } = calcular(curso.evals, objetivo)
                    return (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        {(() => {
                          const { necesitaFinal } = calcular(curso.evals, objetivo)
                          return (
                            <>
                              <p className="text-xs text-gray-500 mb-1">
                                Para llegar a <span className="font-semibold">{objetivo}</span> necesitas sacar en el examen final:
                              </p>
                              <p className={`text-3xl font-semibold mt-1 ${
                                necesitaFinal == null ? "text-gray-300" :
                                necesitaFinal <= 0 ? "text-green-600" :
                                necesitaFinal <= 11 ? "text-green-600" :
                                necesitaFinal <= 14 ? "text-amber-500" :
                                necesitaFinal > 20 ? "text-red-500" : "text-gray-800"}`}>
                                {necesitaFinal == null ? "—" :
                                necesitaFinal <= 0 ? "Ya aprobaste 🎉" :
                                necesitaFinal > 20 ? "No es posible" :
                                Math.ceil(necesitaFinal).toString()}
                              </p>
                            </>
                          )
                        })()}
                      </div>
                    )
                  })()}

                  <button onClick={() => limpiar(curso.id)}
                    className="mt-3 text-xs text-gray-400 hover:text-red-400 transition-colors">
                    Limpiar y volver a pegar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-xl p-5 flex items-center justify-center">
              <p className="text-sm text-gray-300">Selecciona un curso para empezar</p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}