# routes/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, Usuario

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    correo = data.get('correo')
    contrasena = data.get('contrasena')
    rol = data.get('rol', 'empleado')
    dni = data.get('dni')

    if not correo or not contrasena or not dni:
        return jsonify({"error": "Faltan datos"}), 400

    if Usuario.query.filter_by(correo=correo).first():
        return jsonify({"error": "Correo ya existe"}), 400

    nuevo_usuario = Usuario(
        correo=correo,
        contrasena=contrasena,
        rol_id=1 if rol == 'empleador' else 2,  # 1=empleador, 2=empleado
        dni=dni
    )
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"msg": "Usuario creado"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    usuario = Usuario.query.filter_by(correo=correo).first()
    if not usuario or not usuario.check_password(contrasena):
        return jsonify({"error": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity={'id': usuario.id, 'rol': usuario.rol.nombre})
    return jsonify(access_token=access_token), 200