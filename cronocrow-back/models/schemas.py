# models/schemas.py
from pydantic import BaseModel
from typing import Optional

# Auth
class LoginRequest(BaseModel):
    email: str
    password: str

class UsuarioCreate(BaseModel):
    email: str
    password: str
    nombre: str
    apellido: str
    rol: str
    empleador_id: Optional[int] = None
    categoria: Optional[str] = None
    telefono: Optional[str] = None
    fecha_nacimiento: Optional[str] = None

class UsuarioResponse(BaseModel):
    id: int
    email: str
    nombre: str
    apellido: str
    rol: str
    categoria: Optional[str] = None
    telefono: Optional[str] = None

# Asistencia
class AsistenciaRegistro(BaseModel):
    empleado_id: int
    accion: str  # "entrada" o "salida"

# Día libre (CU-03)
class DiaLibreAsignar(BaseModel):
    empleado_id: int
    fecha: str  # YYYY-MM-DD

# Solicitud (CU-04)
class SolicitudCreate(BaseModel):
    empleado_id: int          # ← ¡Este campo es obligatorio!
    tipo: str
    fecha_inicio: str
    fecha_fin: Optional[str] = None