"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import { Clock, Calendar, Users, BarChart, Settings, Bell, LogOut, X } from "lucide-react"

interface DashboardSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }: DashboardSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 md:static md:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 md:hidden">
          <Link href="/dashboard" className="flex items-center">
            <Clock className="h-6 w-6 text-emerald-600 mr-2" />
            <span className="text-xl font-bold text-emerald-600">CronoCrow</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] md:h-screen py-4">
          <div className="px-3 space-y-1">
            <Link href="/dashboard">
              <Button
                variant={
                  isActive("/dashboard") &&
                  !isActive("/dashboard/employees") &&
                  !isActive("/dashboard/time-off") &&
                  !isActive("/dashboard/attendance")
                    ? "default"
                    : "ghost"
                }
                className={`w-full justify-start ${
                  isActive("/dashboard") &&
                  !isActive("/dashboard/employees") &&
                  !isActive("/dashboard/time-off") &&
                  !isActive("/dashboard/attendance")
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : ""
                }`}
              >
                <BarChart className="h-5 w-5 mr-2" />
                Panel de Control
              </Button>
            </Link>

            <Link href="/dashboard/employees">
              <Button
                variant={isActive("/dashboard/employees") ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive("/dashboard/employees") ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                Empleados
              </Button>
            </Link>

            <Link href="/dashboard/time-off">
              <Button
                variant={isActive("/dashboard/time-off") ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive("/dashboard/time-off") ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Días Libres
              </Button>
            </Link>

            <Link href="/dashboard/attendance">
              <Button
                variant={isActive("/dashboard/attendance") ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive("/dashboard/attendance") ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
                }`}
              >
                <Clock className="h-5 w-5 mr-2" />
                Asistencia
              </Button>
            </Link>
          </div>

          <div className="mt-6 px-3">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Configuración</h3>
            <div className="mt-2 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="h-5 w-5 mr-2" />
                Ajustes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="h-5 w-5 mr-2" />
                Notificaciones
              </Button>
            </div>
          </div>

          <div className="mt-6 px-3">
            <Link href="/login">
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-5 w-5 mr-2" />
                Cerrar Sesión
              </Button>
            </Link>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
