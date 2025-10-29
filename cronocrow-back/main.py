# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import api.auth as auth_routes
import api.asistencia as asistencia_routes
import api.empleados as empleados_routes
import api.dias_libres as dias_libres_routes
import api.solicitudes as solicitudes_routes

app = FastAPI(title="CronoCrow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# main.py
import api.empleador as empleador_routes  # ← agrega esta línea

app.include_router(empleador_routes.router, prefix="/api/empleador")  # ← agrega esta línea
app.include_router(auth_routes.router, prefix="/api/auth")
app.include_router(asistencia_routes.router, prefix="/api/asistencia")
app.include_router(empleados_routes.router, prefix="/api/empleados")
app.include_router(dias_libres_routes.router, prefix="/api/dias-libres")
app.include_router(solicitudes_routes.router, prefix="/api/solicitudes")