import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"

// Datos de ejemplo
const attendanceRecords = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Juan Pérez",
    date: "13/05/2025",
    checkIn: "06:05",
    checkOut: "14:10",
    status: "ontime",
    totalHours: "8:05",
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "María López",
    date: "13/05/2025",
    checkIn: "14:15",
    checkOut: "22:05",
    status: "late",
    totalHours: "7:50",
  },
  {
    id: 3,
    employeeId: "EMP005",
    employeeName: "Roberto Sánchez",
    date: "13/05/2025",
    checkIn: "14:00",
    checkOut: "22:00",
    status: "ontime",
    totalHours: "8:00",
  },
  {
    id: 4,
    employeeId: "EMP001",
    employeeName: "Juan Pérez",
    date: "12/05/2025",
    checkIn: "06:00",
    checkOut: "14:00",
    status: "ontime",
    totalHours: "8:00",
  },
  {
    id: 5,
    employeeId: "EMP002",
    employeeName: "María López",
    date: "12/05/2025",
    checkIn: "14:30",
    checkOut: "22:15",
    status: "late",
    totalHours: "7:45",
  },
]

interface AttendanceTableProps {
  searchQuery: string
}

export default function AttendanceTable({ searchQuery }: AttendanceTableProps) {
  const filteredRecords = attendanceRecords.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.date.includes(searchQuery),
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ontime":
        return <Badge className="bg-green-500">A tiempo</Badge>
      case "late":
        return <Badge className="bg-amber-500">Tarde</Badge>
      case "early":
        return <Badge className="bg-blue-500">Salida temprana</Badge>
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
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Entrada</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Salida</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Horas Totales</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {getInitials(record.employeeName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-800">{record.employeeName}</div>
                    <div className="text-xs text-gray-500">{record.employeeId}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{record.date}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{record.checkIn}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{record.checkOut}</td>
              <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{record.totalHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
