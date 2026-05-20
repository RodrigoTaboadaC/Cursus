import Sidebar from "@/components/Sidebar"

const grupos = [
  {
    nombre: "Grupo 4",
    curso: "Base de Datos Avanzada",
    entrega: "10 dias",
    miembros: [
      { iniciales: "RT", nombre: "Rodrigo (tú)", tarea: "Diagrama ER", progreso: 80, color: "bg-green-100 text-green-700", barra: "bg-green-500" },
      { iniciales: "MP", nombre: "Manuel Perez", tarea: "Tablas en SQL", progreso: 100, color: "bg-green-100 text-green-700", barra: "bg-green-500" },
      { iniciales: "GM", nombre: "Gabriel Marengo", tarea: "Normalización de tablas", progreso: 5, color: "bg-red-100 text-red-600", barra: "bg-red-400" },
      { iniciales: "PV", nombre: "Flavio Lecca", tarea: "Documentación", progreso: 45, color: "bg-amber-100 text-amber-600", barra: "bg-amber-400" },
    ]
  },
  {
    nombre: "Grupo 1",
    curso: "Agentes Inteligentes",
    entrega: "11 días",
    miembros: [
      { iniciales: "RT", nombre: "Rodrigo (tú)", tarea: "Presentación", progreso: 30, color: "bg-amber-100 text-amber-600", barra: "bg-amber-400" },
      { iniciales: "JV", nombre: "Jimena Velazco", tarea: "Testeo final del sistema", progreso: 90, color: "bg-green-100 text-green-700", barra: "bg-green-500" },
      { iniciales: "JM", nombre: "Juan Medrano", tarea: "Documentar resultados", progreso: 60, color: "bg-amber-100 text-amber-600", barra: "bg-amber-400" },
    ]
  },
]

export default function Grupos() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Grupos</h1>
            <p className="text-sm text-gray-400 mt-1">Tus trabajos grupales activos</p>
          </div>
          <button className="bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-full">
            + Crear nuevo grupo
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {grupos.map((g, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-900">{g.nombre}</p>
                <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">{g.entrega}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">{g.curso}</p>

              <div className="flex flex-col gap-2">
                {g.miembros.map((m, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${m.color}`}>
                      {m.iniciales}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs text-gray-700">{m.nombre} · {m.tarea}</p>
                        <p className="text-xs text-gray-400">{m.progreso}%</p>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${m.barra}`} style={{ width: `${m.progreso}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
                <button className="text-xs text-blue-500 hover:underline">Ver sala completa</button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}