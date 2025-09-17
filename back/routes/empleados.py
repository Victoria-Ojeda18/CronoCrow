# routes/empleados.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Empleado, Usuario

empleados_bp = Blueprint('empleados', __name__)

@empleados_bp.route('/', methods=['POST'])
@jwt_required()
def crear_empleado():
    current_user = get_jwt_identity()
    if current_user['rol'] != 'empleador':
        return jsonify({"error": "Acceso denegado"}), 403

    data = request.get_json()
    dni = data.get('dni')
    nombre = data.get('nombre')
    cargo = data.get('cargo')
    fecha_contratacion = data.get('fecha_contratacion')
    turno = data.get('turno')
    telefono = data.get('telefono')

    if not dni or not nombre or not cargo or not fecha_contratacion:
        return jsonify({"error": "Faltan datos"}), 400

    if Empleado.query.filter_by(dni=dni).first():
        return jsonify({"error": "DNI ya existe"}), 400

    nuevo_empleado = Empleado(
        dni=dni,
        nombre=nombre,
        cargo=cargo,
        fecha_contratacion=fecha_contratacion,
        turno=turno,
        telefono=telefono
    )
    db.session.add(nuevo_empleado)
    db.session.commit()

    return jsonify({"msg": "Empleado creado", "id": nuevo_empleado.id}), 201

@empleados_bp.route('/', methods=['GET'])
@jwt_required()
def obtener_empleados():
    current_user = get_jwt_identity()
    if current_user['rol'] == 'empleador':
        empleados = Empleado.query.all()
        return jsonify([{
            "id": e.id,
            "dni": e.dni,
            "nombre": e.nombre,
            "cargo": e.cargo,
            "fecha_contratacion": e.fecha_contratacion.isoformat(),
            "turno": e.turno,
            "activo": e.activo
        } for e in empleados])
    else:
        empleado = Empleado.query.filter_by(dni=current_user['dni']).first()
        if not empleado:
            return jsonify({"error": "Empleado no encontrado"}), 404
        return jsonify({
            "id": empleado.id,
            "dni": empleado.dni,
            "nombre": empleado.nombre,
            "cargo": empleado.cargo,
            "fecha_contratacion": empleado.fecha_contratacion.isoformat(),
            "turno": empleado.turno,
            "activo": empleado.activo
        })