# routes/asistencia.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Asistencia, Empleado
from datetime import date, datetime

asistencia_bp = Blueprint('asistencia', __name__)

@asistencia_bp.route('/entrada', methods=['POST'])
@jwt_required()
def registrar_entrada():
    current_user = get_jwt_identity()
    empleado = Empleado.query.filter_by(dni=current_user['dni']).first()
    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    asistencia_hoy = Asistencia.query.filter_by(empleado_id=empleado.id, fecha=date.today()).first()
    if not asistencia_hoy:
        asistencia_hoy = Asistencia(empleado_id=empleado.id, fecha=date.today())
        db.session.add(asistencia_hoy)

    asistencia_hoy.entrada = datetime.now().time()
    db.session.commit()

    return jsonify({"msg": "Entrada registrada", "hora": asistencia_hoy.entrada.strftime('%H:%M:%S')}), 200

@asistencia_bp.route('/salida', methods=['POST'])
@jwt_required()
def registrar_salida():
    current_user = get_jwt_identity()
    empleado = Empleado.query.filter_by(dni=current_user['dni']).first()
    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    asistencia_hoy = Asistencia.query.filter_by(empleado_id=empleado.id, fecha=date.today()).first()
    if not asistencia_hoy:
        return jsonify({"error": "No se registró entrada hoy"}), 400

    asistencia_hoy.salida = datetime.now().time()
    db.session.commit()

    return jsonify({"msg": "Salida registrada", "hora": asistencia_hoy.salida.strftime('%H:%M:%S')}), 200