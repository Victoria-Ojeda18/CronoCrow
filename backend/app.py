# app.py
from flask import Flask, request, jsonify
from models import db, bcrypt, Empleado, Usuario, Rol
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1818@localhost:5433/cronocrow'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
bcrypt.init_app(app)

# Ruta raíz
@app.route('/')
def index():
    return "¡Backend de CronoCrow funcionando! 🎉<br><a href='/api/hello'>Prueba la API</a>"

# Ruta de prueba
@app.route('/api/hello')
def hello():
    return jsonify({"mensaje": "Backend de CronoCrow funcionando"})

# Ruta para agregar empleado
@app.route('/api/empleados', methods=['POST'])
def agregar_empleado():
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        required_fields = ['dni', 'nombre', 'cargo', 'fecha_contratacion', 'correo', 'contrasena']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo requerido: {field}'}), 400
        
        # Verificar DNI duplicado
        if Empleado.query.filter_by(dni=data['dni']).first():
            return jsonify({'error': 'DNI ya registrado'}), 400
        
        # Verificar correo duplicado
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
        db.session.flush()  # Para obtener el ID del empleado
        
        # Obtener rol de empleado (asumimos que existe con nombre='empleado')
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

# Inicialización de la base de datos
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Crear roles si no existen
        if not Rol.query.filter_by(nombre='empleador').first():
            db.session.add(Rol(nombre='empleador'))
        if not Rol.query.filter_by(nombre='empleado').first():
            db.session.add(Rol(nombre='empleado'))
        db.session.commit()
    
    print("✅ Backend corriendo en http://localhost:5000")
    app.run(debug=True, port=5000)
