# api/dias_libres.py
from fastapi import APIRouter, HTTPException
from models.schemas import DiaLibreAsignar
from config.database import get_connection
from datetime import datetime

router = APIRouter()

@router.post("/asignar")
def asignar_dia_libre(dia_libre: DiaLibreAsignar):
    # Validar fecha
    try:
        datetime.strptime(dia_libre.fecha, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de fecha inválido. Use YYYY-MM-DD")

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # Verificar que el empleado exista
            cursor.execute("SELECT id FROM usuarios WHERE id = %s AND rol = 'empleado'", (dia_libre.empleado_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=400, detail="Empleado no válido")

            # Insertar solicitud aprobada (asignada por empleador)
            cursor.execute("""
                INSERT INTO solicitudes (empleado_id, tipo, fecha_inicio, fecha_fin, estado)
                VALUES (%s, 'dia_libre', %s, %s, 'aprobada')
            """, (dia_libre.empleado_id, dia_libre.fecha, dia_libre.fecha))
            conn.commit()

        return {"mensaje": f"Día libre asignado para el {dia_libre.fecha}"}
    finally:
        conn.close()