// src/pages/Employer/AddEmployee.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { empleadosApi } from '../../services/api';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const datos = {
            dni: parseInt(formData.get('dni') as string),
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            telefono: formData.get('telefono') as string,
            cargo: formData.get('cargo') as string,
            fecha_contratacion: formData.get('fecha_contratacion') as string,
            turno: formData.get('turno') as string,
            correo: formData.get('correo') as string,
            contrasena: formData.get('contrasena') as string,
        };

        try {
            await empleadosApi.agregar(datos);
            alert('✅ Empleado agregado exitosamente');
            navigate('/employer');
        } catch (err: any) {
            setError(err.message || 'Error al agregar empleado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8f9fa',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            overflowY: 'auto'
        }}>
            {/* Encabezado moderno con colores verde, violeta y negro */}
            <header style={{
                backgroundColor: 'linear-gradient(135deg, #2E7D32 0%, #6A1B9A 50%, #000000 100%)', // Verde → Violeta → Negro
                padding: '20px 30px',
                color: 'white',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '15px'
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '2rem',
                    fontWeight: '600',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Agregar Empleado
                </h1>
                <button
                    onClick={() => navigate('/employer')}
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'background-color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                    ← Volver
                </button>
            </header>

            {/* Contenedor del formulario centrado */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    maxWidth: '500px',
                    width: '100%',
                    transition: 'transform 0.2s ease'
                }}>
                    <h2 style={{
                        marginBottom: '20px',
                        color: '#333',
                        fontSize: '1.5rem',
                        fontWeight: '500'
                    }}>
                        Completa los datos del empleado
                    </h2>

                    {error && (
                        <div style={{
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            padding: '12px',
                            marginBottom: '20px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #dc3545',
                            textAlign: 'left'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>DNI:</label>
                            <input
                                name="dni"
                                type="number"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Nombre:</label>
                            <input
                                name="nombre"
                                type="text"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Apellido:</label>
                            <input
                                name="apellido"
                                type="text"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Correo:</label>
                            <input
                                name="correo"
                                type="email"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Contraseña:</label>
                            <input
                                name="contrasena"
                                type="password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Cargo:</label>
                            <input
                                name="cargo"
                                type="text"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Fecha Contratación:</label>
                            <input
                                name="fecha_contratacion"
                                type="date"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Teléfono:</label>
                            <input
                                name="telefono"
                                type="tel"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: '500',
                                color: '#555'
                            }}>Turno:</label>
                            <input
                                name="turno"
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: loading ? '#6c757d' : '#2E7D32', // Verde oscuro
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500',
                                marginTop: '10px',
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            {loading ? '⏳ Agregando...' : '➕ Agregar Empleado'}
                        </button>
                    </form>

                    <button
                        onClick={() => navigate('/employer')}
                        style={{
                            marginTop: '15px',
                            padding: '10px 20px',
                            backgroundColor: '#6A1B9A', // Violeta
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8E24AA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A1B9A'}
                    >
                        ❌ Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;