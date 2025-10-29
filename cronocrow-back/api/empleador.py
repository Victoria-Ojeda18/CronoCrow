# api/empleador.py
from fastapi import APIRouter, HTTPException
from config.database import get_connection

router = APIRouter()

@router.get("/dashboard/{empleador_id}")
def obtener_dashboard_empleador(empleador_id: int):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # Verificar que el empleador exista
            cursor.execute("SELECT id, nombre, apellido FROM usuarios WHERE id = %s AND rol = 'empleador'", (empleador_id,))
            empleador = cursor.fetchone()
            if not empleador:
                raise HTTPException(status_code=404, detail="Empleador no encontrado")

            # Contar empleados
            cursor.execute("SELECT COUNT(*) as total FROM usuarios WHERE empleador_id = %s AND rol = 'empleado'", (empleador_id,))
            total_empleados = cursor.fetchone()["total"]

            # Contar presentes hoy (asistencia con hora_entrada HOY)
            cursor.execute("""
                SELECT COUNT(*) as presentes
                FROM asistencias
                WHERE empleado_id IN (SELECT id FROM usuarios WHERE empleador_id = %s)
                AND fecha = CURDATE()
                AND hora_entrada IS NOT NULL
            """, (empleador_id,))
            presentes = cursor.fetchone()["presentes"]

            # Contar ausentes hoy (empleados sin registro HOY)
            cursor.execute("""
                SELECT COUNT(*) as ausentes
                FROM usuarios e
                LEFT JOIN asistencias a ON e.id = a.empleado_id AND a.fecha = CURDATE()
                WHERE e.empleador_id = %s AND e.rol = 'empleado' AND a.id IS NULL
            """, (empleador_id,))
            ausentes = cursor.fetchone()["ausentes"]

            # Solicitudes pendientes
            cursor.execute("SELECT COUNT(*) as pendientes FROM solicitudes WHERE estado = 'pendiente' AND empleado_id IN (SELECT id FROM usuarios WHERE empleador_id = %s)", (empleador_id,))
            pendientes = cursor.fetchone()["pendientes"]

            # Lista de empleados (solo nombre, rubro, estado)
            cursor.execute("""
                SELECT 
                    id, nombre, apellido, categoria as rubro,
                    CASE 
                        WHEN a.hora_entrada IS NOT NULL THEN 'Presente'
                        ELSE 'Ausente'
                    END as estado_hoy
                FROM usuarios e
                LEFT JOIN asistencias a ON e.id = a.empleado_id AND a.fecha = CURDATE()
                WHERE e.empleador_id = %s AND e.rol = 'empleado'
                LIMIT 5
            """, (empleador_id,))
            empleados = cursor.fetchall()

            # Próximos días libres
            cursor.execute("""
                SELECT 
                    u.nombre, u.apellido,
                    s.fecha_inicio, s.tipo
                FROM solicitudes s
                JOIN usuarios u ON s.empleado_id = u.id
                WHERE s.empleador_id IS NULL AND s.estado = 'aprobada'
                AND s.fecha_inicio >= CURDATE()
                AND u.empleador_id = %s
                ORDER BY s.fecha_inicio
                LIMIT 3
            """, (empleador_id,))
            dias_libres = cursor.fetchall()

        return {
            "empleador": empleador,
            "estadisticas": {
                "total_empleados": total_empleados,
                "presentes_hoy": presentes,
                "ausentes_hoy": ausentes,
                "dias_libres_pendientes": pendientes,
            },
            "empleados": empleados,
            "dias_libres": dias_libres,
        }
    finally:
        conn.close()