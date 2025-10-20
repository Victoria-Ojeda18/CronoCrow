"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"

// Datos de ejemplo
const employeesToday = [
  {
    id: "EMP001",
    name: "Juan Pérez",
    position: "Cocinero",
    schedule: "Mañana (6:00 - 14:00)",
    checkIn: "06:05",
    checkOut: null,
    status: "working",
  },
  {
    id: "EMP002",
    name: "María López",
    position: "Mesera",
    schedule: "Tarde (14:00 - 22:00)",
    checkIn: null,
    checkOut: null,
    status: "pending",
  },
  {
    id: "EMP005",
    name: "Roberto Sánchez",
    position: "Ayudante de Cocina",
    schedule: "Tarde (14:00 - 22:00)",
    checkIn: null,
    checkOut: null,
    status: "pending",
  },
  {
    id: "EMP003",
    name: "Carlos Gómez",
    position: "Bartender",
    schedule: "Noche (18:00 - 2:00)",
    checkIn: null,
    checkOut: null,
    status: "pending",
  },
]

interface AttendanceRegisterProps {
  searchQuery: string
}

export default function AttendanceRegister({ searchQuery }: AttendanceRegisterProps) {
  const [employees, setEmployees] = useState(employeesToday)

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleCheckIn = (id: string) => {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    setEmployees(employees.map((emp) => (emp.id === id ? { ...emp, checkIn: time, status: "working" } : emp)))
  }

  const handleCheckOut = (id: string) => {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    setEmployees(employees.map((emp) => (emp.id === id ? { ...emp, checkOut: time, status: "completed" } : emp)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "working":
        return <Badge className="bg-green-500">Trabajando</Badge>
      case "pending":
        return <Badge className="bg-amber-500">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completado</Badge>
      case "absent":
        return <Badge className="bg-red-500">Ausente</Badge>
      default:
        return <Badge className="bg-gray-500">Desconocido</Badge>
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Empleado</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Horario</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Entrada</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Salida</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-800">{employee.name}</div>
                    <div className="text-xs text-gray-500">{employee.position}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{employee.schedule}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {employee.checkIn ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-green-600" />
                    {employee.checkIn}
                  </div>
                ) : (
                  <span className="text-gray-400">No registrado</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {employee.checkOut ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-600" />
                    {employee.checkOut}
                  </div>
                ) : (
                  <span className="text-gray-400">No registrado</span>
                )}
              </td>
              <td className="px-4 py-3">{getStatusBadge(employee.status)}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end space-x-2">
                  {!employee.checkIn && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleCheckIn(employee.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Entrada
                    </Button>
                  )}
                  {employee.checkIn && !employee.checkOut && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleCheckOut(employee.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Salida
                    </Button>
                  )}
                  {!employee.checkIn && (
                    <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      Marcar Ausente
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
