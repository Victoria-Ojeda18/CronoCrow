# api/asistencia.py
from fastapi import APIRouter, HTTPException
from models.schemas import AsistenciaRegistro
from config.database import get_connection
from datetime import date, datetime

router = APIRouter()

@router.post("/registrar")
def registrar_asistencia(data: AsistenciaRegistro):
    # Validar acción
    if data.accion not in ["entrada", "salida"]:
        raise HTTPException(status_code=400, detail="La acción debe ser 'entrada' o 'salida'")

    conn = get_connection()
    hoy = date.today()
    ahora = datetime.now().time()

    try:
        with conn.cursor() as cursor:
            # 🔒 Validar que el empleado exista y sea de tipo 'empleado'
            cursor.execute("SELECT id FROM usuarios WHERE id = %s AND rol = 'empleado'", (data.empleado_id,))
            empleado = cursor.fetchone()
            if not empleado:
                raise HTTPException(status_code=400, detail="Empleado no válido o inexistente")

            # Ver si ya hay un registro para hoy
            cursor.execute("""
                SELECT id, hora_entrada, hora_salida 
                FROM asistencias 
                WHERE empleado_id = %s AND fecha = %s
            """, (data.empleado_id, hoy))
            registro = cursor.fetchone()

            if data.accion == "entrada":
                if registro:
                    if registro["hora_entrada"]:
                        return {"mensaje": "Ya registraste tu entrada hoy"}
                    else:
                        # Actualizar entrada si estaba vacía
                        cursor.execute(
                            "UPDATE asistencias SET hora_entrada = %s WHERE id = %s",
                            (ahora, registro["id"])
                        )
                else:
                    # Crear nuevo registro
                    cursor.execute("""
                        INSERT INTO asistencias (empleado_id, fecha, hora_entrada)
                        VALUES (%s, %s, %s)
                    """, (data.empleado_id, hoy, ahora))
                conn.commit()
                return {"mensaje": "Entrada registrada correctamente"}

            elif data.accion == "salida":
                if not registro:
                    raise HTTPException(status_code=400, detail="No se encontró registro de entrada para hoy")
                if not registro["hora_entrada"]:
                    raise HTTPException(status_code=400, detail="Primero debes registrar tu entrada")
                if registro["hora_salida"]:
                    return {"mensaje": "Ya registraste tu salida hoy"}
                # Registrar salida
                cursor.execute(
                    "UPDATE asistencias SET hora_salida = %s WHERE id = %s",
                    (ahora, registro["id"])
                )
                conn.commit()
                return {"mensaje": "Salida registrada correctamente"}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
    finally:
        conn.close()
        
@router.get("/historial")
def obtener_historial(empleado_id: int, fecha_inicio: str = None, fecha_fin: str = None):
    """
    Obtiene el historial de asistencia de un empleado.
    Parámetros opcionales: fecha_inicio, fecha_fin.
    """
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # Validar que el empleado exista
            cursor.execute("SELECT id FROM usuarios WHERE id = %s AND rol = 'empleado'", (empleado_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=400, detail="Empleado no válido")

            # Construir la consulta
            query = "SELECT * FROM asistencias WHERE empleado_id = %s"
            params = [empleado_id]

            if fecha_inicio and fecha_fin:
                query += " AND fecha BETWEEN %s AND %s"
                params.extend([fecha_inicio, fecha_fin])
            elif fecha_inicio:
                query += " AND fecha >= %s"
                params.append(fecha_inicio)
            elif fecha_fin:
                query += " AND fecha <= %s"
                params.append(fecha_fin)

            cursor.execute(query, tuple(params))
            registros = cursor.fetchall()

        return {"historial": registros}

    finally:
        conn.close()