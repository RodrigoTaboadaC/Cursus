import Sidebar from "@/components/Sidebar"

const tareas = [
  { nombre: "Laboratorio de redes", curso: "Redes y Telecomunicaciones", fecha: "Mañana", estado: "Pendiente", urgencia: "bg-red-100 text-red-600" },
  { nombre: "Práctica calificada 2", curso: "Estructuras de Datos Avanzada",  fecha: "Mañana", estado: "Pendiente", urgencia: "bg-red-100 text-red-600" },
  { nombre: "Desarrollo de casos 6", curso: "Agentes Inteligentes",  fecha: "3 días", estado: "En progreso", urgencia: "bg-amber-100 text-amber-600" },
  { nombre: "Exposición grupal", curso: "Oportunidades de Negocio",  fecha: "5 días", estado: "Pendiente", urgencia: "bg-amber-100 text-amber-600" },
  { nombre: "Proyecto final", curso: "Gerenciamiento de Datos II", fecha: "10 días", estado: "Pendiente", urgencia: "bg-green-100 text-green-700" },
  { nombre: "Proyecto final", curso: "Agentes Inteligentes", fecha: "11 días", estado: "Pendiente", urgencia: "bg-green-100 text-green-700" },
]

export default function Tareas() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Mis tareas</h1>
          <p className="text-sm text-gray-400 mt-1">Sincronizado desde Canvas · Última actualización hace 5 min</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-xs text-red-400 mb-1">Urgentes</p>
            <p className="text-2xl font-semibold text-red-500">2</p>
            <p className="text-xs text-red-400 mt-1">Vencen mañana</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-xs text-amber-500 mb-1">Esta semana</p>
            <p className="text-2xl font-semibold text-amber-500">3</p>
            <p className="text-xs text-amber-400 mt-1">Próximos 7 días</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-xs text-green-500 mb-1">Con tiempo</p>
            <p className="text-2xl font-semibold text-green-600">2</p>
            <p className="text-xs text-green-400 mt-1">Más de 7 días</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Todas las tareas</p>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{tareas.length} tareas</span>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">Tarea</th>
                <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">Curso</th>
                <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">Vence</th>
                <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm text-gray-800 font-medium">{t.nombre}</td>
                  <td className="px-5 py-3 text-xs text-gray-500">{t.curso}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.urgencia}`}>{t.fecha}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-gray-400">{t.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  )
}