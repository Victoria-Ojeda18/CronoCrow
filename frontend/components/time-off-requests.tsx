import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

// Datos de ejemplo
const timeOffRequests = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Juan Pérez",
    type: "Día Libre",
    date: "25/05/2025",
    status: "pending",
    requestDate: "13/05/2025",
    reason: "Asuntos personales",
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "María López",
    type: "Día Libre",
    date: "20/05/2025",
    status: "pending",
    requestDate: "12/05/2025",
    reason: "Cita médica",
  },
  {
    id: 3,
    employeeId: "EMP005",
    employeeName: "Roberto Sánchez",
    type: "Vacaciones",
    date: "10/06/2025 - 17/06/2025",
    status: "pending",
    requestDate: "10/05/2025",
    reason: "Vacaciones familiares",
  },
]

interface TimeOffRequestsProps {
  searchQuery: string
}

export default function TimeOffRequests({ searchQuery }: TimeOffRequestsProps) {
  const filteredRequests = timeOffRequests.filter(
    (request) =>
      request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Empleado</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha Solicitada</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Motivo</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha de Solicitud</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {getInitials(request.employeeName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-800">{request.employeeName}</div>
                    <div className="text-xs text-gray-500">{request.employeeId}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge className={request.type === "Vacaciones" ? "bg-blue-500" : "bg-amber-500"}>{request.type}</Badge>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{request.date}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{request.reason}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{request.requestDate}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Aprobar
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rechazar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
