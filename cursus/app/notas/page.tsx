"use client"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"

type Eval = { id: string; nombre: string; pesoEfectivo: number; nota: string; fecha: string; esFinal: boolean }
type Curso = { id: number; nombre: string; creditos: number; evals: Eval[]; listo: boolean }

function parsearTabla(texto: string): Eval[] {
  const lineas = texto.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  const resultado: Eval[] = []
  let pesoPermanente = 100

  for (const linea of lineas) {
    const partes = linea.split('\t')
    const nombre = partes[0]?.trim().toLowerCase() ?? ''
    const pesoRaw = partes[2]?.trim() ?? partes[1]?.trim() ?? ''
    const peso = parseFloat(pesoRaw.replace('%', '').trim()) || 0
    if (nombre.includes('permanente') || nombre.includes('continua')) { pesoPermanente = peso; break }
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

    if (nomLow === 'promedio' || nomLow.includes('reclamo') || nomLow.includes('promedio de evaluac') ||
      nomLow.includes('permanente') || nomLow.includes('continua') || peso === 0 || peso === 100) continue

    const esFinal = nomLow.includes('final') || nomLow.includes('examen final')
    const pesoEfectivo = esFinal ? peso : (pesoPermanente / 100) * peso

    resultado.push({
      id: Math.random().toString(36).substr(2, 8),
      nombre, pesoEfectivo: parseFloat(pesoEfectivo.toFixed(2)), nota,
      fecha: (fecha === '--' || fecha === '') ? '' : fecha, esFinal,
    })
  }
  return resultado
}

function calcular(evals: Eval[], objetivo: number) {
  const sinFinal = evals.filter(e => !e.esFinal && e.nota !== '')
  const final = evals.find(e => e.esFinal)
  const sumaParcial = sinFinal.reduce((acc, e) => acc + parseFloat(e.nota) * e.pesoEfectivo / 100, 0)
  const necesitaFinal = final ? (objetivo - sumaParcial) / (final.pesoEfectivo / 100) : null
  const promedioActual = sinFinal.length > 0 ? sumaParcial : null
  return { sumaParcial, necesitaFinal, promedioActual, final }
}

function calcularPromedio(evals: Eval[]): number | null {
  const conNota = evals.filter(e => e.nota !== '')
  if (conNota.length === 0) return null
  return conNota.reduce((acc, e) => acc + parseFloat(e.nota) * e.pesoEfectivo / 100, 0)
}

const aprueba = (n: number) => Math.round(n * 10) / 10 >= 10.5

const colorNota = (n: number) => aprueba(n) ? "text-green-600" : n >= 9 ? "text-amber-500" : "text-red-500"

const cursosBase: Curso[] = [
  { id: 1, nombre: "Agentes Inteligentes", creditos: 4, evals: [], listo: false },
  { id: 2, nombre: "Oportunidades de Negocio", creditos: 3, evals: [], listo: false },
  { id: 3, nombre: "Gerenciamiento de Datos II", creditos: 4, evals: [], listo: false },
  { id: 4, nombre: "Estructuras de Datos Avanzada", creditos: 4, evals: [], listo: false },
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

  const promedioGeneral = () => {
    let sp = 0, st = 0
    cursos.forEach(c => {
      if (c.listo) {
        const p = calcularPromedio(c.evals)
        if (p != null) { st += p * c.creditos; sp += c.creditos }
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
          
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            {cursos.map(c => {
              const res = c.listo ? calcular(c.evals, objetivo) : null
              const prom = c.listo ? calcularPromedio(c.evals) : null
              const activo = seleccionado === c.id
              return (
                <div key={c.id} onClick={() => setSeleccionado(activo ? null : c.id)}
                  className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${activo ? "border-blue-300 shadow-sm" : "border-gray-100 hover:border-gray-200"}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold text-gray-900">{c.nombre}</p>
                    <span className="text-xs text-gray-400">{c.creditos} créditos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {prom != null ? (
                      <span className={`text-xs font-semibold ${colorNota(prom)}`}>
                        Promedio: {prom.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">{c.listo ? "Sin notas aún" : "Pega tu tabla →"}</span>
                    )}
                    
                  </div>
                </div>
              )
            })}
          </div>

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
                  <textarea rows={9} placeholder="Pega aquí tu tabla de notas..."
                    value={texto} onChange={e => setTexto(e.target.value)}
                    className="w-full text-xs text-gray-800 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400 font-mono resize-none" />
                  <button onClick={() => evaluar(curso.id)} disabled={texto.trim() === ""}
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
                          <p className="text-xs text-gray-400">Peso: {e.pesoEfectivo}%{e.fecha ? ` · ${e.fecha}` : ''}</p>
                        </div>
                        <input
                          type="number" min="0" max="20" step="1"
                          placeholder={e.esFinal ? "Final" : "—"}
                          value={e.nota}
                          onChange={ev => actualizarNota(curso.id, e.id, ev.target.value)}
                          className={`w-16 text-sm text-center text-gray-900 font-medium border rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 ${e.esFinal ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
                        />
                      </div>
                    ))}
                  </div>

                  {(() => {
                    const prom = calcularPromedio(curso.evals)
                    const finalComp = curso.evals.find(e => e.esFinal)
                    const finalIngresada = finalComp != null && finalComp.nota !== ''
                    const sinFinal = curso.evals.filter(e => !e.esFinal && e.nota !== '')
                    const sumaParcial = sinFinal.reduce((acc, e) => acc + parseFloat(e.nota) * e.pesoEfectivo / 100, 0)
                    const notaMax = finalComp && !finalIngresada ? sumaParcial + (20 * finalComp.pesoEfectivo / 100) : null
                    const { necesitaFinal } = calcular(curso.evals, objetivo)

                    return (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                          <p className="text-xs text-gray-500">Promedio actual</p>
                          <p className={`text-2xl font-semibold ${prom == null ? "text-gray-300" : colorNota(prom)}`}>
                            {prom != null ? prom.toFixed(1) : "—"}
                          </p>
                        </div>

                        {notaMax != null && (
                          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                            <p className="text-xs text-gray-500">Nota máxima posible</p>
                            <p className="text-lg font-semibold text-blue-500">{notaMax.toFixed(1)}</p>
                          </div>
                        )}

                        {finalIngresada && prom != null && (
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">Nota final del curso</p>
                            <div className="text-right">
                              <p className={`text-2xl font-semibold ${colorNota(prom)}`}>{prom.toFixed(1)}</p>
                              <p className={`text-xs mt-0.5 ${aprueba(prom) ? "text-green-500" : "text-red-400"}`}>
                                {aprueba(prom) ? "Aprobado ✓" : "Desaprobado"}
                              </p>
                            </div>
                          </div>
                        )}
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