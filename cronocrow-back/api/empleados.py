# api/empleados.py
from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from models.schemas import UsuarioCreate, UsuarioResponse
from config.database import get_connection

router = APIRouter()
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

@router.post("/", response_model=UsuarioResponse)
def agregar_empleado(empleado: UsuarioCreate):
    # 1. Validar que rol sea 'empleado'
    if empleado.rol != "empleado":
        raise HTTPException(status_code=400, detail="Solo se pueden crear empleados aquí")
    
    # 2. Validar que empleador_id esté presente
    if not empleado.empleador_id:
        raise HTTPException(status_code=400, detail="empleador_id es obligatorio")

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # 3. Verificar que el empleador_id sea de un empleador válido
            cursor.execute("SELECT id FROM usuarios WHERE id = %s AND rol = 'empleador'", (empleado.empleador_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=400, detail="El empleador_id no es válido o no corresponde a un empleador")

            # 4. Verificar email único
            cursor.execute("SELECT id FROM usuarios WHERE email = %s", (empleado.email,))
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="Email ya registrado")

            # 5. Hashear contraseña y crear empleado
            hashed_pw = pwd_context.hash(empleado.password)
            cursor.execute("""
                INSERT INTO usuarios (
                    email, password_hash, rol, empleador_id, nombre, apellido,
                    categoria, telefono, fecha_nacimiento
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                empleado.email, hashed_pw, "empleado", empleado.empleador_id,
                empleado.nombre, empleado.apellido, empleado.categoria,
                empleado.telefono, empleado.fecha_nacimiento
            ))
            conn.commit()
            nuevo_id = cursor.lastrowid

            cursor.execute("""
                SELECT id, email, nombre, apellido, rol, categoria, telefono
                FROM usuarios WHERE id = %s
            """, (nuevo_id,))
            nuevo_empleado = cursor.fetchone()

        return nuevo_empleado
    finally:
        conn.close()
        
# api/empleados.py (agrega al final del archivo)

@router.get("/")
def listar_empleados(empleador_id: int):
    """
    Lista todos los empleados de un empleador.
    """
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # Validar que el empleador exista
            cursor.execute("SELECT id FROM usuarios WHERE id = %s AND rol = 'empleador'", (empleador_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=400, detail="Empleador no válido")

            # Obtener empleados
            cursor.execute("""
                SELECT 
                    id, nombre, apellido, telefono, email, 
                    fecha_nacimiento,
                    categoria as rubro,
                    -- Nota: edad, experiencia, faltas, asistencias, francos
                    -- no están en tu tabla actual. 
                    -- Si los necesitas, deberás agregarlos a la tabla.
                    'Lunes, Martes' as francos
                FROM usuarios 
                WHERE empleador_id = %s AND rol = 'empleado'
            """, (empleador_id,))
            empleados = cursor.fetchall()

            # Calcular asistencias y faltas (simulado por ahora)
            for emp in empleados:
                emp["edad"] = "30"  # ← temporal
                emp["experiencia"] = "5"  # ← temporal
                emp["faltas"] = "2"
                emp["asistencias"] = "118"

        return {"empleados": empleados}
    finally:
        conn.close()