// src/pages/Employer/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard del Empleador</h1>
        <p className="mb-4">Bienvenido/a al panel de control. Aquí podrás:</p>
        <ul className="list-disc pl-6 mb-6">
            <li>Agregar empleados</li>
            <li>Asignar días libres y vacaciones</li>
            <li>Ver historial de asistencia</li>
            <li>Filtrar empleados por criterio</li>
        </ul>
        <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
            Cerrar sesión
        </button>
        </div>
    );
};

export default EmployerDashboard;