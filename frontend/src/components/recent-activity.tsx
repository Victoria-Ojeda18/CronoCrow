import { Avatar, AvatarFallback } from "../components/ui/avatar"

// Datos de ejemplo
const recentActivity = [
  {
    id: 1,
    employeeName: "María López",
    action: "registró entrada",
    time: "Hace 10 minutos",
  },
  {
    id: 2,
    employeeName: "Juan Pérez",
    action: "solicitó día libre",
    time: "Hace 30 minutos",
  },
  {
    id: 3,
    employeeName: "Roberto Sánchez",
    action: "registró salida",
    time: "Hace 1 hora",
  },
  {
    id: 4,
    employeeName: "Ana Rodríguez",
    action: "día libre aprobado",
    time: "Hace 2 horas",
  },
]

export default function RecentActivity() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      {recentActivity.map((item) => (
        <div key={item.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-100 text-emerald-700">
              {getInitials(item.employeeName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm">
              <span className="font-medium">{item.employeeName}</span> {item.action}
            </p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
