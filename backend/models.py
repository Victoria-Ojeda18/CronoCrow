# models.py
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class Rol(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True, nullable=False)

class Empleado(db.Model):
    __tablename__ = 'empleados'
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.Integer, unique=True, nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20))
    cargo = db.Column(db.String(50), nullable=False)
    fecha_contratacion = db.Column(db.Date, nullable=False)
    turno = db.Column(db.String(20))
    activo = db.Column(db.Boolean, default=True)
    creado_en = db.Column(db.DateTime, default=datetime.utcnow)

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.Integer, unique=True, nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    rol_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleados.id'), nullable=True)
    creado_en = db.Column(db.DateTime, default=datetime.utcnow)

    rol = db.relationship('Rol', backref='usuarios')
    empleado = db.relationship('Empleado', backref='usuario', uselist=False)

    def set_password(self, password):
        self.contrasena = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.contrasena, password)

class DiaLibre(db.Model):
    __tablename__ = 'dias_libres'
    id = db.Column(db.Integer, primary_key=True)
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleados.id'), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    tipo = db.Column(db.String(20), default='semanal')
    creado_en = db.Column(db.DateTime, default=datetime.utcnow)

    empleado = db.relationship('Empleado', backref='dias_libres')

    __table_args__ = (db.UniqueConstraint('empleado_id', 'fecha', name='uq_empleado_fecha'),)

class Vacacion(db.Model):
    __tablename__ = 'vacaciones'
    id = db.Column(db.Integer, primary_key=True)
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleados.id'), nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    estado = db.Column(db.String(20), default='pendiente')
    creado_en = db.Column(db.DateTime, default=datetime.utcnow)

    empleado = db.relationship('Empleado', backref='vacaciones')

class Asistencia(db.Model):
    __tablename__ = 'asistencias'
    id = db.Column(db.Integer, primary_key=True)
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleados.id'), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    entrada = db.Column(db.Time)
    salida = db.Column(db.Time)
    creado_en = db.Column(db.DateTime, default=datetime.utcnow)

    empleado = db.relationship('Empleado', backref='asistencias')

    __table_args__ = (db.UniqueConstraint('empleado_id', 'fecha', name='uq_empleado_fecha_asistencia'),)

class Solicitud(db.Model):
    __tablename__ = 'solicitudes'
    id = db.Column(db.Integer, primary_key=True)
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleados.id'), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # 'vacaciones', 'dia_libre', etc.
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date)
    estado = db.Column(db.String(20), default='pendiente')
    creado_en = db.Column(db.DateTime, default=datetime.utcnow)

    empleado = db.relationship('Empleado', backref='solicitudes')