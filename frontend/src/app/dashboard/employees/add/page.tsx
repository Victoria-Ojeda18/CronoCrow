"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Textarea } from "../../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"
import DashboardHeader from "../../../../components/dashboard-header"
import DashboardSidebar from "../../../../components/dashboard-sidebar"

export default function AddEmployeePage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard/employees")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.push("/dashboard/employees")}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Agregar Nuevo Empleado</h1>
              <p className="text-gray-600">Ingresa la información del nuevo empleado</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="work">Información Laboral</TabsTrigger>
                <TabsTrigger value="access">Acceso al Sistema</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Datos Personales</CardTitle>
                    <CardDescription>Ingresa la información personal básica del empleado</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input id="firstName" placeholder="Nombre" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input id="lastName" placeholder="Apellido" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" placeholder="+54 123 456 7890" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                        <Input id="birthdate" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idNumber">DNI / Documento</Label>
                        <Input id="idNumber" placeholder="12345678" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Textarea id="address" placeholder="Dirección completa" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="work">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Laboral</CardTitle>
                    <CardDescription>Detalles sobre el puesto y condiciones laborales</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="position">Cargo</Label>
                        <Input id="position" placeholder="Cargo o puesto" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kitchen">Cocina</SelectItem>
                            <SelectItem value="service">Servicio</SelectItem>
                            <SelectItem value="bar">Bar</SelectItem>
                            <SelectItem value="admin">Administración</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Fecha de Inicio</Label>
                        <Input id="startDate" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contractType">Tipo de Contrato</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fulltime">Tiempo Completo</SelectItem>
                            <SelectItem value="parttime">Tiempo Parcial</SelectItem>
                            <SelectItem value="temporary">Temporal</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary">Salario</Label>
                        <Input id="salary" type="number" placeholder="0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="schedule">Horario</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar horario" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Mañana (6:00 - 14:00)</SelectItem>
                            <SelectItem value="afternoon">Tarde (14:00 - 22:00)</SelectItem>
                            <SelectItem value="night">Noche (22:00 - 6:00)</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas Adicionales</Label>
                      <Textarea id="notes" placeholder="Información adicional relevante" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="access">
                <Card>
                  <CardHeader>
                    <CardTitle>Acceso al Sistema</CardTitle>
                    <CardDescription>Configura las credenciales de acceso para el empleado</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">ID de Empleado</Label>
                      <Input id="employeeId" placeholder="ID único para el empleado" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Contraseña Temporal</Label>
                        <Input id="password" type="password" placeholder="••••••••" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accessLevel">Nivel de Acceso</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Empleado</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => router.push("/dashboard/employees")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Guardando..." : "Guardar Empleado"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
