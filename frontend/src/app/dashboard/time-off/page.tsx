"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Search, Calendar, Filter, Plus, CheckCircle, Clock, XCircle } from "lucide-react"
import DashboardHeader from "../../../components/dashboard-header"
import DashboardSidebar from "../../../components/dashboard-sidebar"
import TimeOffCalendar from "../../../components/time-off-calendar"
import TimeOffList from "../../../components/time-off-list"
import TimeOffRequests from "../../../components/time-off-requests"

export default function TimeOffPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Días Libres y Vacaciones</h1>
              <p className="text-gray-600">Gestiona los días libres y vacaciones de tus empleados</p>
            </div>

            <div className="mt-4 md:mt-0">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Asignar Día Libre
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Días Libres Aprobados</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Solicitudes Pendientes</p>
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
                  <p className="text-sm text-gray-500">Solicitudes Rechazadas</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Filtros y Búsqueda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nombre o ID de empleado..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros Avanzados
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendario
              </TabsTrigger>
              <TabsTrigger value="list">
                <CheckCircle className="h-4 w-4 mr-2" />
                Días Asignados
              </TabsTrigger>
              <TabsTrigger value="requests">
                <Clock className="h-4 w-4 mr-2" />
                Solicitudes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Card>
                <CardContent className="p-4">
                  <TimeOffCalendar />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <TimeOffList searchQuery={searchQuery} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardContent className="p-0">
                  <TimeOffRequests searchQuery={searchQuery} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
