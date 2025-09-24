# routes/empleados.py
from flask import Blueprint, request, jsonify
from models import db, Empleado, Usuario, Rol
from datetime import datetime

empleados_bp = Blueprint('empleados', __name__)

@empleados_bp.route('/empleados', methods=['POST'])
def agregar_empleado():
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        required_fields = ['dni', 'nombre', 'cargo', 'fecha_contratacion', 'correo', 'contrasena']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo requerido: {field}'}), 400
        
        # Verificar si el DNI ya existe
        if Empleado.query.filter_by(dni=data['dni']).first():
            return jsonify({'error': 'DNI ya registrado'}), 400
        
        # Verificar si el correo ya existe
        if Usuario.query.filter_by(correo=data['correo']).first():
            return jsonify({'error': 'Correo ya registrado'}), 400
        
        # Crear empleado
        nuevo_empleado = Empleado(
            dni=data['dni'],
            nombre=data['nombre'],
            telefono=data.get('telefono'),
            cargo=data['cargo'],
            fecha_contratacion=datetime.strptime(data['fecha_contratacion'], '%Y-%m-%d').date(),
            turno=data.get('turno')
        )
        db.session.add(nuevo_empleado)
        db.session.flush()  # Para obtener el id del empleado
        
        # Obtener el rol de empleado (asumimos que id=2)
        rol_empleado = Rol.query.filter_by(nombre='empleado').first()
        if not rol_empleado:
            return jsonify({'error': 'Rol de empleado no encontrado'}), 500
        
        # Crear usuario
        nuevo_usuario = Usuario(
            dni=data['dni'],
            correo=data['correo'],
            rol_id=rol_empleado.id,
            empleado_id=nuevo_empleado.id
        )
        nuevo_usuario.set_password(data['contrasena'])
        db.session.add(nuevo_usuario)
        
        db.session.commit()
        
        return jsonify({
            'mensaje': 'Empleado agregado exitosamente',
            'empleado_id': nuevo_empleado.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500