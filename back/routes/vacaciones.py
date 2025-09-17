# routes/vacaciones.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Vacacion, Empleado

vacaciones_bp = Blueprint('vacaciones', __name__)

@vacaciones_bp.route('/solicitar', methods=['POST'])
@jwt_required()
def solicitar_vacaciones():
    current_user = get_jwt_identity()
    data = request.get_json()
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')

    if not fecha_inicio or not fecha_fin:
        return jsonify({"error": "Faltan fechas"}), 400

    empleado = Empleado.query.filter_by(dni=current_user['dni']).first()
    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    nueva_vacacion = Vacacion(
        empleado_id=empleado.id,
        fecha_inicio=fecha_inicio,
        fecha_fin=fecha_fin,
        estado='pendiente'
    )
    db.session.add(nueva_vacacion)
    db.session.commit()

    return jsonify({"msg": "Vacaciones solicitadas", "id": nueva_vacacion.id}), 201

@vacaciones_bp.route('/mis-vacaciones', methods=['GET'])
@jwt_required()
def mis_vacaciones():
    current_user = get_jwt_identity()
    empleado = Empleado.query.filter_by(dni=current_user['dni']).first()
    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    vacaciones = Vacacion.query.filter_by(empleado_id=empleado.id).all()
    return jsonify([{
        "id": v.id,
        "fecha_inicio": v.fecha_inicio.isoformat(),
        "fecha_fin": v.fecha_fin.isoformat(),
        "estado": v.estado
    } for v in vacaciones])