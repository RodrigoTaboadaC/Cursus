"use client"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const link = (href: string, label: string, badge?: number) => {
    const active = pathname === href
    return (
      <a href={href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${active ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-500 hover:bg-gray-50"}`}>
        {label}
        {badge && <span className="ml-auto text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">{badge}</span>}
      </a>
    )
  }

  return (
    <aside className="w-52 min-h-screen bg-white border-r border-gray-100 flex flex-col py-4">

      <div className="px-4 pb-4 border-b border-gray-100 mb-3">
        <p className="text-sm font-semibold text-gray-900">CURSUS</p>
        <p className="text-xs text-gray-400">USIL · Séptimo ciclo</p>
      </div>

      <nav className="flex flex-col gap-1 px-2">
        <p className="text-xs text-gray-400 uppercase tracking-wider px-2 mt-2 mb-1">Principal</p>
        {link("/dashboard", "Dashboard")}
        {link("/tareas", "Mis tareas", 5)}
        {link("/grupos", "Grupos")}

        <p className="text-xs text-gray-400 uppercase tracking-wider px-2 mt-4 mb-1">Aprendizaje</p>
        {link("/minijuegos", "Minijuegos")}
        {link("/notas", "Mis notas")}
      </nav>

      <div className="mt-auto mx-3 bg-amber-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-amber-800">7 días de racha</p>
        <p className="text-xs text-amber-600">Juega hoy para no perderla</p>
      </div>

    </aside>
  )
}