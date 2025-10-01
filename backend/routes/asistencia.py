from flask import Blueprint, request, jsonify
from models import Asistencia, Empleado, db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date, time

asistencia_bp = Blueprint('asistencia', __name__)

@asistencia_bp.route('/marcar', methods=['POST'])
@jwt_required()
def marcar_asistencia():
    current_user_id = get_jwt_identity()
    usuario = Usuario.query.get(current_user_id)
    if not usuario or not usuario.empleado_id:
        return jsonify({'error': 'Usuario no válido'}), 400

    empleado_id = usuario.empleado_id
    data = request.get_json()
    tipo = data.get('tipo')  # 'entrada' o 'salida'

    hoy = date.today()
    asistencia = Asistencia.query.filter_by(empleado_id=empleado_id, fecha=hoy).first()

    if not asistencia:
        asistencia = Asistencia(empleado_id=empleado_id, fecha=hoy)
        db.session.add(asistencia)

    if tipo == 'entrada':
        asistencia.entrada = time.now().strftime('%H:%M:%S')
    elif tipo == 'salida':
        asistencia.salida = time.now().strftime('%H:%M:%S')
    else:
        return jsonify({'error': 'Tipo inválido. Usa "entrada" o "salida"'}), 400

    db.session.commit()
    return jsonify({'message': 'Asistencia registrada', 'asistencia': {
        'fecha': asistencia.fecha.isoformat(),
        'entrada': str(asistencia.entrada) if asistencia.entrada else None,
        'salida': str(asistencia.salida) if asistencia.salida else None
    }}), 200

@asistencia_bp.route('/historial', methods=['GET'])
@jwt_required()
def get_historial_asistencia():
    current_user_id = get_jwt_identity()
    usuario = Usuario.query.get(current_user_id)
    if not usuario:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    empleado_id = usuario.empleado_id
    if not empleado_id:
        return jsonify({'error': 'Empleado no asociado'}), 400

    # Si es empleador, puede ver historial de cualquier empleado
    if usuario.rol.nombre == 'empleador':
        empleado_id = request.args.get('empleado_id', empleado_id, type=int)

    asistencias = Asistencia.query.filter_by(empleado_id=empleado_id).order_by(Asistencia.fecha.desc()).all()
    return jsonify([{
        'fecha': a.fecha.isoformat(),
        'entrada': str(a.entrada) if a.entrada else None,
        'salida': str(a.salida) if a.salida else None,
        'creado_en': a.creado_en.isoformat()
    } for a in asistencias]), 200