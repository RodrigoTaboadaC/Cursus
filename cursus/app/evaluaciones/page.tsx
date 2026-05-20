import Sidebar from "@/components/Sidebar"

const evaluaciones = [
  { nombre: "Evaluacion de Conocimientos 1", curso: "Agentes Inteligentes", fecha: "21/05/2026", hora: "8:00 AM", aula: "A-301", peso: "25%", estado: "Próximo", color: "bg-red-100 text-red-600" },
  { nombre: "Practica Calificada 2", curso: "Agentes Inteligentes", fecha: "01/06/2026", hora: "8:00 AM", aula: "A-301", peso: "35%", estado: "Pendiente", color: "bg-amber-100 text-amber-600" },
  { nombre: "Practica Calificada 1", curso: "Gerenciamiento de Datos II", fecha: "22/05/2026", hora: "10:00 AM", aula: "B-204", peso: "35%", estado: "Próximo", color: "bg-red-100 text-red-600" },
  { nombre: "Evaluación 2", curso: "Cultural Transformation", fecha: "10/06/2026", hora: "10:00 AM", aula: "B-204", peso: "30%", estado: "Pendiente", color: "bg-amber-100 text-amber-600" },
  { nombre: "Evaluación 3", curso: "Cultural Transformation", fecha: "24/06/2026", hora: "10:00 AM", aula: "B-204", peso: "35%", estado: "Pendiente", color: "bg-amber-100 text-amber-600" },
  { nombre: "Practica Calificada 2", curso: "Estructura de Datos Avanzada", fecha: "15/07/2026", hora: "8:00 AM", aula: "A-301", peso: "30%", estado: "Lejano", color: "bg-green-100 text-green-700" },
]

const proximos = evaluaciones.filter(e => e.estado === "Próximo")
const pendientes = evaluaciones.filter(e => e.estado === "Pendiente")
const lejanos = evaluaciones.filter(e => e.estado === "Lejano")

export default function Evaluaciones() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Evaluaciones</h1>
          <p className="text-sm text-gray-400 mt-1">Exámenes y evaluaciones programadas del ciclo</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-xs text-red-400 mb-1">Esta semana</p>
            <p className="text-2xl font-semibold text-red-500">{proximos.length}</p>
            <p className="text-xs text-red-400 mt-1">Requieren preparación urgente</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-xs text-amber-500 mb-1">Próximas semanas</p>
            <p className="text-2xl font-semibold text-amber-500">{pendientes.length}</p>
            <p className="text-xs text-amber-400 mt-1">No son urgentes, pero ve preparándote</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-xs text-green-500 mb-1">Con tiempo</p>
            <p className="text-2xl font-semibold text-green-600">{lejanos.length}</p>
            <p className="text-xs text-green-400 mt-1">Tienes más de un mes</p>
          </div>
        </div>

        {[
          { titulo: "Esta semana", lista: proximos, borde: "border-red-200", bg: "bg-red-50" },
          { titulo: "Próximas semanas", lista: pendientes, borde: "border-amber-200", bg: "bg-amber-50" },
          { titulo: "Con tiempo", lista: lejanos, borde: "border-green-200", bg: "bg-green-50" },
        ].map((grupo, gi) => grupo.lista.length > 0 && (
          <div key={gi} className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{grupo.titulo}</p>
            <div className="grid grid-cols-2 gap-3">
              {grupo.lista.map((e, i) => (
                <div key={i} className={`bg-white border ${grupo.borde} rounded-xl p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{e.nombre}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{e.curso}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${e.color}`}>{e.peso}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-400">Fecha</p>
                      <p className="text-xs font-medium text-gray-700">{e.fecha}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Hora</p>
                      <p className="text-xs font-medium text-gray-700">{e.hora}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Aula</p>
                      <p className="text-xs font-medium text-gray-700">{e.aula}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </main>
    </div>
  )
}