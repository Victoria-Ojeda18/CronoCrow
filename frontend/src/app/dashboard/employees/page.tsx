"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Search, UserPlus, Filter, Download, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import DashboardHeader from "../../../components/dashboard-header"
import DashboardSidebar from "../../../components/dashboard-sidebar"
import EmployeeTable from "../../../components/employee-table"

export default function EmployeesPage() {
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
              <h1 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h1>
              <p className="text-gray-600">Administra la información de tus empleados</p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <Link href="/dashboard/employees/add">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Agregar Empleado
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Exportar como CSV</DropdownMenuItem>
                  <DropdownMenuItem>Exportar como PDF</DropdownMenuItem>
                  <DropdownMenuItem>Imprimir Lista</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    placeholder="Buscar por nombre, ID o cargo..."
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

          <Card>
            <CardContent className="p-0">
              <EmployeeTable searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
