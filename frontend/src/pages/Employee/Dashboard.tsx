// src/pages/Employee/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard del Empleado</h1>
        <p className="mb-4">Bienvenido/a. Aquí podrás:</p>
        <ul className="list-disc pl-6 mb-6">
            <li>Registrar tu entrada y salida</li>
            <li>Ver tus días libres y vacaciones</li>
            <li>Solicitar días libres o vacaciones</li>
            <li>Consultar tu historial de asistencia</li>
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

export default EmployeeDashboard;