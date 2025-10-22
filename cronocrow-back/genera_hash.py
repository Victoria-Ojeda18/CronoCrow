# genera_hash.py
from passlib.context import CryptContext

# Usamos argon2 en lugar de bcrypt
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
print(pwd_context.hash("123456"))  # Cambia "123456" por tu contraseña