import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Calendar } from "lucide-react"

// Datos de ejemplo
const upcomingTimeOff = [
  {
    id: 1,
    employeeName: "Carlos Gómez",
    type: "Vacaciones",
    startDate: "20/05/2025",
    endDate: "27/05/2025",
  },
  {
    id: 2,
    employeeName: "Ana Rodríguez",
    type: "Día Libre",
    startDate: "15/05/2025",
    endDate: "15/05/2025",
  },
  {
    id: 3,
    employeeName: "Juan Pérez",
    type: "Día Libre",
    startDate: "18/05/2025",
    endDate: "18/05/2025",
  },
]

export default function UpcomingTimeOff() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      {upcomingTimeOff.map((item) => (
        <div key={item.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-100 text-emerald-700">
              {getInitials(item.employeeName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{item.employeeName}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.type === "Vacaciones" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {item.type}
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {item.startDate === item.endDate ? item.startDate : `${item.startDate} - ${item.endDate}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
