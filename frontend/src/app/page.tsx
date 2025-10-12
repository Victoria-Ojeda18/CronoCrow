import Link from "next/link"
import { Button } from "../components/ui/button"
import { Clock, Calendar, Users, LogIn } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-500 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Clock className="h-8 w-8 text-white mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">CronoCrow</h1>
            </div>
            <div className="flex space-x-2">
              <Link href="/login">
                <Button variant="outline" className="bg-white text-emerald-600 hover:bg-gray-100">
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tiempo y Equipo, Organizados</h2>
                <p className="text-lg text-gray-600 mb-6">
                  CronoCrow es la solución perfecta para gestionar horarios, días libres y vacaciones de tus empleados
                  de manera eficiente y sin complicaciones.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Link href="/login">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Comenzar Ahora</Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                      Ver Características
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="CronoCrow Dashboard Preview"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Características Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestión de Empleados</h3>
                <p className="text-gray-600">
                  Agrega, edita y organiza la información de tus empleados en un solo lugar.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Días Libres y Vacaciones</h3>
                <p className="text-gray-600">
                  Asigna y gestiona días libres y vacaciones de forma sencilla y organizada.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Control de Horarios</h3>
                <p className="text-gray-600">
                  Registra entradas y salidas, y consulta el historial de asistencia de cada empleado.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">CronoCrow</span>
              </div>
              <p className="text-gray-400 mt-2">Tiempo y Equipo, Organizados</p>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CronoCrow. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
