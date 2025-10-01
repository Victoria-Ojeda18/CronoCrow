from flask import Blueprint, request, jsonify
from models import Empleado, Usuario, Rol, db
from flask_jwt_extended import jwt_required, get_jwt_identity

empleados_bp = Blueprint('empleados', __name__)

# Solo empleador puede acceder
def require_empleador():
    current_user_id = get_jwt_identity()
    usuario = Usuario.query.get(current_user_id)
    if not usuario or usuario.rol.nombre != 'empleador':
        return jsonify({'error': 'Acceso denegado'}), 403
    return usuario

@empleados_bp.route('/', methods=['GET'])
@jwt_required()
def get_empleados():
    usuario = require_empleador()
    if isinstance(usuario, tuple):  # Si es error
        return usuario

    empleados = Empleado.query.all()
    return jsonify([{
        'id': e.id,
        'dni': e.dni,
        'nombre': e.nombre,
        'telefono': e.telefono,
        'cargo': e.cargo,
        'fecha_contratacion': e.fecha_contratacion.isoformat(),
        'turno': e.turno,
        'activo': e.activo
    } for e in empleados]), 200

@empleados_bp.route('/', methods=['POST'])
@jwt_required()
def add_empleado():
    usuario = require_empleador()
    if isinstance(usuario, tuple):
        return usuario

    data = request.get_json()
    required_fields = ['dni', 'nombre', 'cargo', 'fecha_contratacion']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'Campo {field} es requerido'}), 400

    empleado = Empleado(
        dni=data['dni'],
        nombre=data['nombre'],
        telefono=data.get('telefono'),
        cargo=data['cargo'],
        fecha_contratacion=data['fecha_contratacion'],
        turno=data.get('turno', ''),
        activo=data.get('activo', True)
    )
    db.session.add(empleado)
    db.session.commit()

    # Crear usuario asociado si se proporciona correo y contraseña
    if data.get('correo') and data.get('contrasena'):
        rol_empleado = Rol.query.filter_by(nombre='empleado').first()
        nuevo_usuario = Usuario(
            dni=data['dni'],
            correo=data['correo'],
            contrasena='',  # Se setea después
            rol_id=rol_empleado.id,
            empleado_id=empleado.id
        )
        nuevo_usuario.set_password(data['contrasena'])
        db.session.add(nuevo_usuario)
        db.session.commit()

    return jsonify({'message': 'Empleado agregado', 'id': empleado.id}), 201

@empleados_bp.route('/<int:empleado_id>', methods=['PUT'])
@jwt_required()
def edit_empleado(empleado_id):
    usuario = require_empleador()
    if isinstance(usuario, tuple):
        return usuario

    empleado = Empleado.query.get(empleado_id)
    if not empleado:
        return jsonify({'error': 'Empleado no encontrado'}), 404

    data = request.get_json()
    for key, value in data.items():
        if hasattr(empleado, key):
            setattr(empleado, key, value)

    db.session.commit()
    return jsonify({'message': 'Empleado actualizado'}), 200

@empleados_bp.route('/<int:empleado_id>', methods=['DELETE'])
@jwt_required()
def delete_empleado(empleado_id):
    usuario = require_empleador()
    if isinstance(usuario, tuple):
        return usuario

    empleado = Empleado.query.get(empleado_id)
    if not empleado:
        return jsonify({'error': 'Empleado no encontrado'}), 404

    # Verificar que no tenga solicitudes activas
    solicitudes_pendientes = Solicitud.query.filter_by(empleado_id=empleado_id, estado='pendiente').first()
    if solicitudes_pendientes:
        return jsonify({'error': 'No se puede eliminar: tiene solicitudes pendientes'}), 400

    # Eliminar usuario asociado si existe
    usuario_asociado = Usuario.query.filter_by(empleado_id=empleado_id).first()
    if usuario_asociado:
        db.session.delete(usuario_asociado)

    db.session.delete(empleado)
    db.session.commit()
    return jsonify({'message': 'Empleado eliminado'}), 200