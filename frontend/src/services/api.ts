// src/services/api.ts
const API_BASE_URL = 'http://localhost:5000/api';

export const empleadosApi = {
    agregar: async (datos: any) => {
        const response = await fetch(`${API_BASE_URL}/empleados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
        });
        
        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al agregar empleado');
        }
        
        return response.json();
    },
};