from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import Usuario, db
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    usuario = Usuario.query.filter_by(correo=correo).first()

    if usuario and usuario.check_password(contrasena):
        access_token = create_access_token(identity=usuario.id, expires_delta=timedelta(days=1))
        return jsonify({
            'access_token': access_token,
            'rol': usuario.rol.nombre,
            'empleado_id': usuario.empleado_id
        }), 200

    return jsonify({'error': 'Credenciales inválidas'}), 401

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    current_user_id = get_jwt_identity()
    usuario = Usuario.query.get(current_user_id)
    if not usuario:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    return jsonify({
        'id': usuario.id,
        'correo': usuario.correo,
        'rol': usuario.rol.nombre,
        'empleado_id': usuario.empleado_id,
        'nombre_empleado': usuario.empleado.nombre if usuario.empleado else None
    }), 200