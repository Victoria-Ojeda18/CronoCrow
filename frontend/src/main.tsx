// src/main.tsx
import { createRoot } from 'react-dom/client';

let userRole: 'employer' | 'employee' | null = null;

const loginAs = (role: 'employer' | 'employee') => {
  userRole = role;
  localStorage.setItem('userRole', role);
  renderApp();
};

const logout = () => {
  userRole = null;
  localStorage.removeItem('userRole');
  renderApp();
};

// ✅ FUNCIÓN ÚNICA para agregar empleado
const addEmployee = async (data: any) => {
    try {
        const response = await fetch('http://localhost:5000/api/empleados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        });
        
        if (response.ok) {
        alert('✅ Empleado agregado exitosamente');
        renderEmployerDashboard();
        } else {
        const errorData = await response.json();
        alert('❌ Error: ' + (errorData.error || 'No se pudo agregar el empleado'));
        }
    } catch (err) {
        alert('⚠️ Error de conexión. ¿Está el backend corriendo en http://localhost:5000?');
    }
};

const renderLogin = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background:#f0f0f0;font-family:Arial,sans-serif">
      <div style="background:white;padding:30px;border-radius:10px;box-shadow:0 0 15px rgba(0,0,0,0.1);text-align:center;max-width:400px">
        <h1 style="color:#333;margin-bottom:20px">CronoCrow</h1>
        <p style="color:#666;margin-bottom:25px">Bienvenido/a – Inicia sesión como empleador o empleado</p>
        <button onclick="window.loginAs('employer')" style="display:block;width:100%;margin:10px 0;padding:12px;background:#007bff;color:white;border:none;border-radius:6px;cursor:pointer;font-size:16px">
          👔 Iniciar sesión como Empleador
        </button>
        <button onclick="window.loginAs('employee')" style="display:block;width:100%;margin:10px 0;padding:12px;background:#28a745;color:white;border:none;border-radius:6px;cursor:pointer;font-size:16px">
          👷 Iniciar sesión como Empleado
        </button>
      </div>
    </div>
  `;
};

const renderEmployerDashboard = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="width:100vw;height:100vh;background:#f8f9fa;font-family:Arial,sans-serif">
      <div style="padding:20px;background:#007bff;color:white">
        <h1 style="margin:0">Dashboard del Empleador</h1>
        <button onclick="window.logout()" style="margin-top:10px;padding:8px 16px;background:#dc3545;border:none;border-radius:4px;color:white;cursor:pointer">
          Cerrar sesión
        </button>
      </div>
      <div style="padding:20px">
        <h2 style="color:#333;margin-bottom:20px">Funcionalidades</h2>
        <button onclick="window.showAddEmployee()" style="display:block;margin:10px 0;padding:12px;background:#28a745;color:white;border:none;border-radius:6px;cursor:pointer;width:200px">
          ➕ Agregar Empleado
        </button>
        <ul style="margin-top:20px">
          <li>Asignar días libres y vacaciones</li>
          <li>Ver historial de asistencia</li>
          <li>Filtrar empleados por criterio</li>
        </ul>
      </div>
    </div>
  `;
};

const showAddEmployee = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="width:100vw;height:100vh;background:#f8f9fa;font-family:Arial,sans-serif">
      <div style="padding:20px;background:#007bff;color:white">
        <h1 style="margin:0">Agregar Empleado</h1>
        <button onclick="window.renderEmployerDashboard()" style="margin-top:10px;padding:8px 16px;background:#6c757d;border:none;border-radius:4px;color:white;cursor:pointer">
          ← Volver
        </button>
      </div>
      <div style="padding:20px;max-width:500px">
        <form id="employeeForm" style="background:white;padding:20px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.1)">
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">DNI:</label>
            <input type="number" name="dni" required style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">Nombre:</label>
            <input type="text" name="nombre" required style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">Apellido:</label>
            <input type="text" name="apellido" required style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">Correo:</label>
            <input type="email" name="correo" required style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">Contraseña:</label>
            <input type="password" name="contrasena" required style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">Cargo:</label>
            <input type="text" name="cargo" required style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">Fecha Contratación:</label>
            <input type="date" name="fecha_contratacion" required style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <div style="margin-bottom:15px">
            <label style="display:block;margin-bottom:5px">Teléfono:</label>
            <input type="tel" name="telefono" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px">
          </div>
          <button type="submit" style="width:100%;padding:12px;background:#007bff;color:white;border:none;border-radius:6px;cursor:pointer">
            Agregar Empleado
          </button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('employeeForm') as HTMLFormElement;
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = {
        dni: parseInt(formData.get('dni') as string),
        nombre: (formData.get('nombre') as string) + ' ' + (formData.get('apellido') as string),
        telefono: formData.get('telefono') as string,
        cargo: formData.get('cargo') as string,
        fecha_contratacion: formData.get('fecha_contratacion') as string,
        correo: formData.get('correo') as string,
        contrasena: formData.get('contrasena') as string
      };
      addEmployee(data);
    };
  }
};

const renderEmployeeDashboard = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="width:100vw;height:100vh;background:#f8f9fa;font-family:Arial,sans-serif">
      <div style="padding:20px;background:#28a745;color:white">
        <h1 style="margin:0">Dashboard del Empleado</h1>
        <button onclick="window.logout()" style="margin-top:10px;padding:8px 16px;background:#dc3545;border:none;border-radius:4px;color:white;cursor:pointer">
          Cerrar sesión
        </button>
      </div>
      <div style="padding:20px">
        <h2 style="color:#333;margin-bottom:20px">Funcionalidades</h2>
        <ul>
          <li>Registrar entrada y salida</li>
          <li>Ver días libres y vacaciones</li>
          <li>Solicitar días libres o vacaciones</li>
          <li>Consultar historial de asistencia</li>
        </ul>
      </div>
    </div>
  `;
};

const renderApp = () => {
  if (!userRole) {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole === 'employer' || savedRole === 'employee') {
      userRole = savedRole as any;
    }
  }

  if (userRole === 'employer') {
    renderEmployerDashboard();
  } else if (userRole === 'employee') {
    renderEmployeeDashboard();
  } else {
    renderLogin();
  }
};

(window as any).loginAs = loginAs;
(window as any).logout = logout;
(window as any).renderEmployerDashboard = renderEmployerDashboard;
(window as any).showAddEmployee = showAddEmployee;
(window as any).renderEmployeeDashboard = renderEmployeeDashboard;
(window as any).EmployeeList = [];
renderApp();