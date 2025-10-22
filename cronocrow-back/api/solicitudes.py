# api/solicitudes.py
from fastapi import APIRouter, HTTPException
from models.schemas import SolicitudCreate
from config.database import get_connection
from datetime import datetime

router = APIRouter()

@router.post("/")
def crear_solicitud(solicitud: SolicitudCreate):
    if solicitud.tipo not in ["dia_libre", "vacaciones"]:
        raise HTTPException(status_code=400, detail="Tipo debe ser 'dia_libre' o 'vacaciones'")

    try:
        datetime.strptime(solicitud.fecha_inicio, "%Y-%m-%d")
        if solicitud.fecha_fin:
            datetime.strptime(solicitud.fecha_fin, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de fecha inválido. Use YYYY-MM-DD")

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id FROM usuarios WHERE id = %s AND rol = 'empleado'", (solicitud.empleado_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=400, detail="Empleado no válido")

            cursor.execute("""
                INSERT INTO solicitudes (empleado_id, tipo, fecha_inicio, fecha_fin, estado)
                VALUES (%s, %s, %s, %s, 'pendiente')
            """, (
                solicitud.empleado_id,
                solicitud.tipo,
                solicitud.fecha_inicio,
                solicitud.fecha_fin or solicitud.fecha_inicio
            ))
            conn.commit()

        return {"mensaje": "Solicitud creada. Estado: pendiente"}
    finally:
        conn.close()