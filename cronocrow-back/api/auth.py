from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from models.schemas import LoginRequest, UsuarioResponse, UsuarioCreate
from config.database import get_connection

router = APIRouter()
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

@router.post("/login")
def login(data: LoginRequest):  # ← Nombre explícito + tipo Pydantic
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, email, password_hash, rol FROM usuarios WHERE email = %s", (data.email,))
            user = cursor.fetchone()
        
        if not user or not pwd_context.verify(data.password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Credenciales inválidas")
        
        return {
            "id": user["id"],
            "email": user["email"],
            "rol": user["rol"]
        }
    finally:
        conn.close()
        
        
        
# ✅ Registro: el usuario elige su contraseña, el backend la hashea
@router.post("/registro", response_model=UsuarioResponse)
def registrar_usuario(usuario: UsuarioCreate):
    if usuario.rol not in ["empleador", "empleado"]:
        raise HTTPException(status_code=400, detail="Rol debe ser 'empleador' o 'empleado'")
    
    # Si es empleado, debe tener empleador_id
    if usuario.rol == "empleado" and not usuario.empleador_id:
        raise HTTPException(status_code=400, detail="empleador_id es requerido para empleados")
    
    # Si es empleador, empleador_id debe ser NULL
    if usuario.rol == "empleador":
        usuario.empleador_id = None

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # Verificar email único
            cursor.execute("SELECT id FROM usuarios WHERE email = %s", (usuario.email,))
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="Email ya registrado")

            # 🔒 Hashear la contraseña que el usuario eligió
            hashed_pw = pwd_context.hash(usuario.password)  # ← ¡Esto lo hace el backend!

            # Insertar usuario
            cursor.execute("""
                INSERT INTO usuarios (
                    email, password_hash, rol, empleador_id, nombre, apellido,
                    categoria, telefono, fecha_nacimiento
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                usuario.email, hashed_pw, usuario.rol, usuario.empleador_id,
                usuario.nombre, usuario.apellido, usuario.categoria,
                usuario.telefono, usuario.fecha_nacimiento
            ))
            conn.commit()
            nuevo_id = cursor.lastrowid

            cursor.execute("""
                SELECT id, email, nombre, apellido, rol, categoria, telefono
                FROM usuarios WHERE id = %s
            """, (nuevo_id,))
            nuevo_usuario = cursor.fetchone()

        return nuevo_usuario

    finally:
        conn.close()
