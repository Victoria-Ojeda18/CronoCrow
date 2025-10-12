"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Search, Filter, Download, Clock, Calendar, BarChart } from "lucide-react"
import DashboardHeader from "../../../components/dashboard-header"
import DashboardSidebar from "../../../components/dashboard-sidebar"
import AttendanceTable from "../../../components/attendance-table"
import AttendanceChart from "../../../components/attendance-chart"
import AttendanceRegister from "../../../components/attendance-register"

export default function AttendancePage() {
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
              <h1 className="text-2xl font-bold text-gray-800">Control de Asistencia</h1>
              <p className="text-gray-600">Gestiona los registros de entrada y salida</p>
            </div>

            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Exportar Registros
              </Button>
            </div>
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
                <div className="flex gap-2">
                  <Input type="date" className="w-full md:w-auto" />
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="register">
                <Clock className="h-4 w-4 mr-2" />
                Registro Diario
              </TabsTrigger>
              <TabsTrigger value="history">
                <Calendar className="h-4 w-4 mr-2" />
                Historial
              </TabsTrigger>
              <TabsTrigger value="stats">
                <BarChart className="h-4 w-4 mr-2" />
                Estadísticas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="register">
              <Card>
                <CardContent className="p-0">
                  <AttendanceRegister searchQuery={searchQuery} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardContent className="p-0">
                  <AttendanceTable searchQuery={searchQuery} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardContent className="p-4">
                  <AttendanceChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
