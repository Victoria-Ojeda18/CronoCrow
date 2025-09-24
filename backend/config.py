# config.py
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'mi_secreto_super_seguro_2025')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///instance/cronocrown.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt_secreto_para_cronocrown')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    
