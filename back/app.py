# app.py
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db, bcrypt
from config import Config
from routes.auth import auth_bp
from routes.empleados import empleados_bp
from routes.vacaciones import vacaciones_bp
from routes.asistencia import asistencia_bp
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    db.init_app(app)
    bcrypt.init_app(app)
    # En app.py, dentro de create_app():
    with app.app_context():
        db.create_all()
        # Insertar roles iniciales si no existen
        if Rol.query.count() == 0:
            db.session.add(Rol(nombre='empleador'))
            db.session.add(Rol(nombre='empleado'))
            db.session.commit()
    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(empleados_bp, url_prefix='/api/empleados')
    app.register_blueprint(vacaciones_bp, url_prefix='/api/vacaciones')
    app.register_blueprint(asistencia_bp, url_prefix='/api/asistencia')

    # Crear tablas si no existen
    with app.app_context():
        if not os.path.exists('instance'):
            os.makedirs('instance')
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)