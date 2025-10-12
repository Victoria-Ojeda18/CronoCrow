import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"

// Datos de ejemplo
const timeOffList = [
  {
    id: 1,
    employeeId: "EMP003",
    employeeName: "Carlos Gómez",
    type: "Vacaciones",
    startDate: "20/05/2025",
    endDate: "27/05/2025",
    status: "approved",
    notes: "Vacaciones anuales",
  },
  {
    id: 2,
    employeeId: "EMP004",
    employeeName: "Ana Rodríguez",
    type: "Día Libre",
    startDate: "15/05/2025",
    endDate: "15/05/2025",
    status: "approved",
    notes: "Asuntos personales",
  },
  {
    id: 3,
    employeeId: "EMP001",
    employeeName: "Juan Pérez",
    type: "Día Libre",
    startDate: "18/05/2025",
    endDate: "18/05/2025",
    status: "approved",
    notes: "Cita médica",
  },
  {
    id: 4,
    employeeId: "EMP002",
    employeeName: "María López",
    type: "Día Libre",
    startDate: "22/05/2025",
    endDate: "22/05/2025",
    status: "approved",
    notes: "",
  },
  {
    id: 5,
    employeeId: "EMP005",
    employeeName: "Roberto Sánchez",
    type: "Vacaciones",
    startDate: "01/06/2025",
    endDate: "07/06/2025",
    status: "approved",
    notes: "Vacaciones familiares",
  },
]

interface TimeOffListProps {
  searchQuery: string
}

export default function TimeOffList({ searchQuery }: TimeOffListProps) {
  const filteredTimeOff = timeOffList.filter(
    (item) =>
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha Inicio</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha Fin</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Notas</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTimeOff.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {getInitials(item.employeeName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-800">{item.employeeName}</div>
                    <div className="text-xs text-gray-500">{item.employeeId}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge className={item.type === "Vacaciones" ? "bg-blue-500" : "bg-amber-500"}>{item.type}</Badge>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{item.startDate}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{item.endDate}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.notes || <span className="text-gray-400">Sin notas</span>}
              </td>
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
