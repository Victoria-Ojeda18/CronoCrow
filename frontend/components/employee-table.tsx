"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Calendar, Clock } from "lucide-react"

// Datos de ejemplo
const employees = [
  {
    id: "EMP001",
    name: "Juan Pérez",
    position: "Cocinero",
    department: "Cocina",
    status: "active",
    schedule: "Mañana (6:00 - 14:00)",
    email: "juan.perez@example.com",
    phone: "+54 123 456 7890",
    startDate: "10/01/2020",
  },
  {
    id: "EMP002",
    name: "María López",
    position: "Mesera",
    department: "Servicio",
    status: "active",
    schedule: "Tarde (14:00 - 22:00)",
    email: "maria.lopez@example.com",
    phone: "+54 123 456 7891",
    startDate: "15/03/2021",
  },
  {
    id: "EMP003",
    name: "Carlos Gómez",
    position: "Bartender",
    department: "Bar",
    status: "vacation",
    schedule: "Noche (18:00 - 2:00)",
    email: "carlos.gomez@example.com",
    phone: "+54 123 456 7892",
    startDate: "05/06/2019",
  },
  {
    id: "EMP004",
    name: "Ana Rodríguez",
    position: "Cajera",
    department: "Administración",
    status: "dayoff",
    schedule: "Mañana (8:00 - 16:00)",
    email: "ana.rodriguez@example.com",
    phone: "+54 123 456 7893",
    startDate: "20/11/2022",
  },
  {
    id: "EMP005",
    name: "Roberto Sánchez",
    position: "Ayudante de Cocina",
    department: "Cocina",
    status: "active",
    schedule: "Tarde (14:00 - 22:00)",
    email: "roberto.sanchez@example.com",
    phone: "+54 123 456 7894",
    startDate: "12/08/2021",
  },
]

interface EmployeeTableProps {
  searchQuery: string
}

export default function EmployeeTable({ searchQuery }: EmployeeTableProps) {
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activo</Badge>
      case "vacation":
        return <Badge className="bg-blue-500">Vacaciones</Badge>
      case "dayoff":
        return <Badge className="bg-amber-500">Día Libre</Badge>
      default:
        return <Badge className="bg-gray-500">Desconocido</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Empleado</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Cargo</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Departamento</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contacto</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Horario</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">{employee.id}</td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-800">{employee.name}</div>
                    <div className="text-xs text-gray-500">Desde: {employee.startDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{employee.position}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{employee.department}</td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-600">{employee.email}</div>
                <div className="text-xs text-gray-500">{employee.phone}</div>
              </td>
              <td className="px-4 py-3">{getStatusBadge(employee.status)}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{employee.schedule}</td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Asignar día libre
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Clock className="h-4 w-4 mr-2" />
                      Ver asistencia
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
