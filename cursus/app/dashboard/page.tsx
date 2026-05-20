import Sidebar from "@/components/Sidebar"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Hola, Rodrigo Taboada 👋</h1>
            <p className="text-sm text-gray-400 mt-1">Tienes 3 entregas esta semana...Empecemos</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700">
            RT
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Entregas pendientes</p>
            <p className="text-2xl font-semibold text-red-500">5</p>
            <p className="text-xs text-gray-400 mt-1">2 vencen mañana</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Grupos de trabajo activos</p>
            <p className="text-2xl font-semibold text-gray-900">2</p>
            <p className="text-xs text-gray-400 mt-1">1 compañero retrasado</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Racha diaria</p>
            <p className="text-2xl font-semibold text-amber-500">7 días</p>
            <p className="text-xs text-gray-400 mt-1">Minijuego pendiente hoy</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">Próximas entregas</p>
              <p className="text-xs text-blue-500 cursor-pointer">Ver todas</p>
            </div>
            {[
              { nombre: "Laboratorio de redes", curso: "Redes y Telecomunicaciones", urgencia: "Mañana", color: "bg-red-100 text-red-600" },
              { nombre: "Desarrollo de casos 6", curso: "Agentes Inteligentes", urgencia: "3 días", color: "bg-amber-100 text-amber-600" },
              { nombre: "Exposición grupal", curso: "Oportunidades de Negocio", urgencia: "5 días", color: "bg-amber-100 text-amber-600" },
              { nombre: "Proyecto final", curso: "Gerenciamiento de Datos II", urgencia: "11 días", color: "bg-green-100 text-green-700" },

            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-800">{t.nombre}</p>
                  <p className="text-xs text-gray-400">{t.curso}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.color}`}>{t.urgencia}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">Modo grupal · Grupo 4 Gerenciamiento de Datos</p>
              <p className="text-xs text-blue-500 cursor-pointer">Ver grupo</p>
            </div>
            {[
              
              { iniciales: "RT", nombre: "Rodrigo (tú) · Diagrama ER", estado: "Casi terminado", progreso: 80, color: "bg-green-100 text-green-700", barra: "bg-green-500" },
              { iniciales: "LR", nombre: "Manuel Perez · Tablas en SQL", estado: "Entregado", progreso: 100, color: "bg-green-100 text-green-700", barra: "bg-green-500" },
              { iniciales: "MG", nombre: "Gabriel Marengo · Normalización de tablas", estado: "Sin empezar", progreso: 5, color: "bg-red-100 text-red-600", barra: "bg-red-400" },
              { iniciales: "PV", nombre: "Flavio Lecca · Documentación final", estado: "En progreso", progreso: 45, color: "bg-amber-100 text-amber-600", barra: "bg-amber-400" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${m.color}`}>{m.iniciales}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800">{m.nombre}</p>
                  <p className="text-xs text-gray-400">{m.estado}</p>
                  <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div className={`h-full rounded-full ${m.barra}`} style={{ width: `${m.progreso}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white border-2 border-blue-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🎮</span>
                </div>
                <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Minijuego del día · Memoria visual</p>
                <p className="text-xs text-gray-400">3–5 min · Activa tu cerebro antes de estudiar · Racha en riesgo</p>
                </div>
                <button className="bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-full">
                Jugar ahora
                </button>
            </div>
            </div>

      </main>
    </div>
  )
}