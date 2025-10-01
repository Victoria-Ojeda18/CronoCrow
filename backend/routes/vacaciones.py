from flask import Blueprint, request, jsonify
from models import DiaLibre, Vacacion, Solicitud, Empleado, db
from flask_jwt_extended import jwt_required, get_jwt_identity

vacaciones_bp = Blueprint('vacaciones', __name__)

# Función auxiliar para verificar permisos
def get_current_empleado():
    current_user_id = get_jwt_identity()
    usuario = Usuario.query.get(current_user_id)
    if not usuario or not usuario.empleado_id:
        return None, jsonify({'error': 'Usuario no válido'}), 400
    return usuario.empleado_id, None, None

@vacaciones_bp.route('/dias-libres', methods=['GET'])
@jwt_required()
def get_dias_libres():
    empleado_id, error, status = get_current_empleado()
    if error:
        return error, status

    dias_libres = DiaLibre.query.filter_by(empleado_id=empleado_id).all()
    return jsonify([{
        'id': d.id,
        'fecha': d.fecha.isoformat(),
        'tipo': d.tipo,
        'creado_en': d.creado_en.isoformat()
    } for d in dias_libres]), 200

@vacaciones_bp.route('/dias-libres', methods=['POST'])
@jwt_required()
def add_dia_libre():
    empleado_id, error, status = get_current_empleado()
    if error:
        return error, status

    data = request.get_json()
    fecha = data.get('fecha')
    tipo = data.get('tipo', 'semanal')

    if not fecha:
        return jsonify({'error': 'Fecha es requerida'}), 400

    dia_libre = DiaLibre(empleado_id=empleado_id, fecha=fecha, tipo=tipo)
    db.session.add(dia_libre)
    db.session.commit()
    return jsonify({'message': 'Día libre asignado', 'id': dia_libre.id}), 201

@vacaciones_bp.route('/vacaciones', methods=['GET'])
@jwt_required()
def get_vacaciones():
    empleado_id, error, status = get_current_empleado()
    if error:
        return error, status

    vacaciones = Vacacion.query.filter_by(empleado_id=empleado_id).all()
    return jsonify([{
        'id': v.id,
        'fecha_inicio': v.fecha_inicio.isoformat(),
        'fecha_fin': v.fecha_fin.isoformat(),
        'estado': v.estado,
        'creado_en': v.creado_en.isoformat()
    } for v in vacaciones]), 200

@vacaciones_bp.route('/vacaciones', methods=['POST'])
@jwt_required()
def add_vacacion():
    empleado_id, error, status = get_current_empleado()
    if error:
        return error, status

    data = request.get_json()
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')
    estado = data.get('estado', 'pendiente')

    if not fecha_inicio or not fecha_fin:
        return jsonify({'error': 'Fechas requeridas'}), 400

    vacacion = Vacacion(empleado_id=empleado_id, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin, estado=estado)
    db.session.add(vacacion)
    db.session.commit()
    return jsonify({'message': 'Vacación asignada', 'id': vacacion.id}), 201

# Solicitudes (para empleados)
@vacaciones_bp.route('/solicitudes', methods=['POST'])
@jwt_required()
def crear_solicitud():
    empleado_id, error, status = get_current_empleado()
    if error:
        return error, status

    data = request.get_json()
    tipo = data.get('tipo')  # 'vacaciones', 'dia_libre'
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')  # opcional para día libre

    if not tipo or not fecha_inicio:
        return jsonify({'error': 'Tipo y fecha inicio son requeridos'}), 400

    solicitud = Solicitud(
        empleado_id=empleado_id,
        tipo=tipo,
        fecha_inicio=fecha_inicio,
        fecha_fin=fecha_fin,
        estado='pendiente'
    )
    db.session.add(solicitud)
    db.session.commit()
    return jsonify({'message': 'Solicitud creada', 'id': solicitud.id}), 201

@vacaciones_bp.route('/solicitudes', methods=['GET'])
@jwt_required()
def get_solicitudes():
    current_user_id = get_jwt_identity()
    usuario = Usuario.query.get(current_user_id)
    if not usuario:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    if usuario.rol.nombre == 'empleador':
        solicitudes = Solicitud.query.all()
    else:
        solicitudes = Solicitud.query.filter_by(empleado_id=usuario.empleado_id).all()

    return jsonify([{
        'id': s.id,
        'tipo': s.tipo,
        'fecha_inicio': s.fecha_inicio.isoformat(),
        'fecha_fin': s.fecha_fin.isoformat() if s.fecha_fin else None,
        'estado': s.estado,
        'creado_en': s.creado_en.isoformat()
    } for s in solicitudes]), 200

@vacaciones_bp.route('/solicitudes/<int:solicitud_id>', methods=['PUT'])
@jwt_required()
def actualizar_solicitud(solicitud_id):
    usuario = Usuario.query.get(get_jwt_identity())
    if not usuario or usuario.rol.nombre != 'empleador':
        return jsonify({'error': 'Solo el empleador puede aprobar/rechazar solicitudes'}), 403

    solicitud = Solicitud.query.get(solicitud_id)
    if not solicitud:
        return jsonify({'error': 'Solicitud no encontrada'}), 404

    data = request.get_json()
    estado = data.get('estado')
    if estado not in ['aprobada', 'rechazada']:
        return jsonify({'error': 'Estado inválido'}), 400

    solicitud.estado = estado

    # Si es aprobada y es vacación, crear registro en Vacacion
    if estado == 'aprobada' and solicitud.tipo == 'vacaciones':
        vacacion = Vacacion(
            empleado_id=solicitud.empleado_id,
            fecha_inicio=solicitud.fecha_inicio,
            fecha_fin=solicitud.fecha_fin,
            estado='aprobada'
        )
        db.session.add(vacacion)

    # Si es aprobada y es día libre, crear registro en DiaLibre
    elif estado == 'aprobada' and solicitud.tipo == 'dia_libre':
        dia_libre = DiaLibre(
            empleado_id=solicitud.empleado_id,
            fecha=solicitud.fecha_inicio,
            tipo='solicitado'
        )
        db.session.add(dia_libre)

    db.session.commit()
    return jsonify({'message': 'Solicitud actualizada'}), 200