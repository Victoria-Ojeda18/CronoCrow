from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from config import Config

# Inicializar extensiones
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Inicializar extensiones con la app
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'  # Ruta de login

    # Registrar blueprints
    from routes.auth import auth_bp
    from routes.empleados import empleados_bp
    from routes.asistencia import asistencia_bp
    from routes.vacaciones import vacaciones_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(empleados_bp, url_prefix='/api/empleados')
    app.register_blueprint(asistencia_bp, url_prefix='/api/asistencia')
    app.register_blueprint(vacaciones_bp, url_prefix='/api/vacaciones')

    # Crear tablas si no existen
    with app.app_context():
        db.create_all()

        # Crear roles iniciales si no existen
        from models import Rol
        if not Rol.query.filter_by(nombre='empleador').first():
            rol_empleador = Rol(nombre='empleador')
            rol_empleado = Rol(nombre='empleado')
            db.session.add(rol_empleador)
            db.session.add(rol_empleado)
            db.session.commit()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)