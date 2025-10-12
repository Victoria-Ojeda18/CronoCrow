"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Calendar, Users, UserPlus, CheckCircle, XCircle, Filter } from "lucide-react"
import DashboardHeader from "../../components/dashboard-header"
import DashboardSidebar from "../../components/dashboard-sidebar"
import EmployeeList from "../../components/employee-list"
import AttendanceStats from "../../components/attendance-stats"
import UpcomingTimeOff from "../../components/upcoming-time-off"
import RecentActivity from "../../components/recent-activity"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
            <p className="text-gray-600">Bienvenido de nuevo, Administrador</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Empleados</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Presentes Hoy</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Días Libres Pendientes</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ausentes Hoy</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Empleados</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-1" />
                      Filtrar
                    </Button>
                    <Link href="/dashboard/employees/add">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Agregar
                      </Button>
                    </Link>
                  </div>
                </div>
                <CardDescription>Lista de todos los empleados activos</CardDescription>
              </CardHeader>
              <CardContent>
                <EmployeeList />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Próximos Días Libres</CardTitle>
                <CardDescription>Días libres y vacaciones programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingTimeOff />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Estadísticas de Asistencia</CardTitle>
                <CardDescription>Resumen de los últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceStats />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
