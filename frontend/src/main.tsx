import { createRoot } from 'react-dom/client';

let userRole: 'employer' | 'employee' | null = null;

// ─── FUNCIONES GLOBALES ───────────────────────────────────────

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

const addEmployee = async (data: any) => {
  try {
    const response = await fetch('http://localhost:5000/api/empleados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('✅ ¡Empleado agregado con cariño!');
      renderEmployerDashboard();
    } else {
      const errorData = await response.json();
      alert('❌ Oops: ' + (errorData.error || 'Algo salió mal al agregar al empleado 💔'));
    }
  } catch (err) {
    alert('⚠️ ¡Ups! ¿Está el backend prendido en http://localhost:5000? 🌈');
  }
};

// ─── ESTILOS (VERDE/TEAL COMO EN EL EJEMPLO) ──────────────────

const COLORS = {
  primary: '#a78bfa',     // violeta suave (lavanda)
  secondary: '#fda4af',   // rosa bebé
  accent: '#6ee7b7',      // verde menta
  background: '#fdf2f8',  // fondo rosa muy claro
  card: '#ffffff',
  text: '#5a5a5a',
  buttonPrimary: '#a78bfa',
  buttonSecondary: '#6ee7b7',
  buttonDanger: '#fda4af',
};

// ─── PÁGINA DE INICIO (LANDING) ───────────────────────────────

const renderLogin = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: ${COLORS.background};
      font-family: 'Segoe UI', system-ui, sans-serif;
      margin: 0;
      padding: 0;
    ">

      <!-- HEADER -->
      <div style="
        background: ${COLORS.primary};
        color: white;
        padding: 12px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      ">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h1 style="margin: 0; font-weight: 700; font-size: 20px;">CronoCrow</h1>
        </div>
        <button onclick="window.showLoginForm()" style="
          background: white;
          color: ${COLORS.primary};
          border: 2px solid ${COLORS.primary};
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${COLORS.primary}" style="transform: rotate(-90deg);">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
          Iniciar Sesión
        </button>
      </div>

      <!-- CONTENIDO PRINCIPAL -->
      <div style="
        display: flex;
        flex-grow: 1;
        padding: 40px 24px;
        gap: 40px;
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
      ">

        <!-- TEXTO Y BOTONES -->
        <div style="
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 500px;
        ">
          <h1 style="
            color: ${COLORS.text};
            font-size: 36px;
            font-weight: 700;
            line-height: 1.2;
            margin: 0;
          ">Tiempo y Equipo, Organizados</h1>
          <p style="
            color: #555;
            font-size: 16px;
            line-height: 1.6;
            margin: 0;
          ">CronoCrow es la solución perfecta para gestionar horarios, días libres y vacaciones de tus empleados de manera eficiente y sin complicaciones.</p>
          <div style="display: flex; gap: 16px; margin-top: 24px;">
            <div style="display: flex; gap: 16px; margin-top: 24px;">
  <button onclick="window.showLoginForm()" style="
    background: ${COLORS.primary};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    ">Comenzar Ahora</button>
    <button onclick="alert('Función en desarrollo: Ver Características')" style="
      background: ${COLORS.buttonSecondary};
      color: ${COLORS.primary};
      border: 2px solid ${COLORS.primary};
      border-radius: 8px;
      padding: 12px 24px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
    ">Ver Características</button>
  </div>
          </div>
        </div>

        <!-- IMAGEN PLACEHOLDER -->
        <div style="
          flex: 1;
          background: #e0e0e0;
          border-radius: 16px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        ">
          <div style="
            width: 120px;
            height: 120px;
            border: 2px dashed #bbb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
          ">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#bbb">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="
        background: #f5f5f5;
        padding: 16px 24px;
        text-align: center;
        color: #777;
        font-size: 14px;
      ">
        © 2025 CronoCrow — Gestión inteligente de tiempo y equipo
      </div>
    </div>
  `;
};

// ─── FORMULARIO DE LOGIN ──────────────────────────────────────

const showLoginForm = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${COLORS.background};
      font-family: 'Segoe UI', system-ui, sans-serif;
      padding: 20px;
    ">
      <div style="
        background: white;
        padding: 32px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        width: 100%;
        max-width: 480px;
      ">

        <!-- LOGO -->
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        ">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="${COLORS.primary}">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h1 style="margin: 0; font-weight: 700; font-size: 24px; color: ${COLORS.primary};">CronoCrow</h1>
        </div>

        <!-- PESTAÑAS -->
        <div style="
          display: flex;
          border-bottom: 2px solid #eee;
          margin-bottom: 24px;
        ">
          <button onclick="window.switchToEmployer()" style="
            flex: 1;
            padding: 12px;
            background: ${COLORS.buttonSecondary};
            color: ${COLORS.text};
            border: none;
            border-radius: 8px 8px 0 0;
            font-weight: 600;
            cursor: pointer;
          " id="tab-empleador">Empleador</button>
          <button onclick="window.switchToEmployee()" style="
            flex: 1;
            padding: 12px;
            background: #f5f5f5;
            color: #777;
            border: none;
            border-radius: 8px 8px 0 0;
            font-weight: 600;
            cursor: pointer;
          " id="tab-empleado">Empleado</button>
        </div>

        <!-- FORMULARIO -->
        <div id="login-form" style="display: flex; flex-direction: column; gap: 20px;">
          <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: ${COLORS.text};">Iniciar Sesión como Empleador</h2>
          <p style="color: #777; font-size: 14px; margin: 0 0 20px;">Accede para gestionar a tu equipo, horarios y días libres.</p>

          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Correo Electrónico</label>
            <div style="position: relative;">
              <input type="email" id="email" placeholder="tu@email.com" 
                style="width: 100%; padding: 12px 12px 12px 40px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.3s;"
                onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#777" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 6 8-6v10zm-8-7L4 6l8 6 8-6z"/>
              </svg>
            </div>
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Contraseña</label>
            <div style="position: relative;">
              <input type="password" id="password" placeholder="••••••••"
                style="width: 100%; padding: 12px 12px 12px 40px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.3s;"
                onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#777" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 6h2v2h-2v-2zm0-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
              </svg>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
              <a href="#" style="color: ${COLORS.primary}; text-decoration: none; font-size: 14px; font-weight: 600;">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <button onclick="window.loginUser()" style="
            background: ${COLORS.primary};
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 8px;
            box-shadow: 0 4px 12px rgba(0,150,136,0.2);
            transition: transform 0.2s, box-shadow 0.2s;
          " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 16px rgba(0,150,136,0.3)';"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,150,136,0.2)';">
            Iniciar Sesión
          </button>
        </div>

      </div>
    </div>
  `;
};

// ─── FUNCIONES AUXILIARES PARA EL LOGIN ───────────────────────

const switchToEmployer = () => {
  const tabEmp = document.getElementById('tab-empleador');
  const tabEmpl = document.getElementById('tab-empleado');
  const form = document.getElementById('login-form');

  if (tabEmp && tabEmpl && form) {
    tabEmp.style.background = COLORS.buttonSecondary;
    tabEmp.style.color = COLORS.text;
    tabEmpl.style.background = '#f5f5f5';
    tabEmpl.style.color = '#777';

    form.innerHTML = `
      <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: ${COLORS.text};">Iniciar Sesión como Empleador</h2>
      <p style="color: #777; font-size: 14px; margin: 0 0 20px;">Accede para gestionar a tu equipo, horarios y días libres.</p>

      <div>
        <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Correo Electrónico</label>
        <div style="position: relative;">
          <input type="email" id="email" placeholder="tu@email.com" 
            style="width: 100%; padding: 12px 12px 12px 40px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.3s;"
            onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#777" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 6 8-6v10zm-8-7L4 6l8 6 8-6z"/>
          </svg>
        </div>
      </div>

      <div>
        <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Contraseña</label>
        <div style="position: relative;">
          <input type="password" id="password" placeholder="••••••••"
            style="width: 100%; padding: 12px 12px 12px 40px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.3s;"
            onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#777" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 6h2v2h-2v-2zm0-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          </svg>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
          <a href="#" style="color: ${COLORS.primary}; text-decoration: none; font-size: 14px; font-weight: 600;">¿Olvidaste tu contraseña?</a>
        </div>
      </div>

      <button onclick="window.loginUser()" style="
        background: ${COLORS.primary};
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(0,150,136,0.2);
        transition: transform 0.2s, box-shadow 0.2s;
      " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 16px rgba(0,150,136,0.3)';"
        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,150,136,0.2)';">
        Iniciar Sesión
      </button>
    `;
  }
};

const switchToEmployee = () => {
  const tabEmp = document.getElementById('tab-empleador');
  const tabEmpl = document.getElementById('tab-empleado');
  const form = document.getElementById('login-form');

  if (tabEmp && tabEmpl && form) {
    tabEmp.style.background = '#f5f5f5';
    tabEmp.style.color = '#777';
    tabEmpl.style.background = COLORS.buttonSecondary;
    tabEmpl.style.color = COLORS.text;

    form.innerHTML = `
      <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: ${COLORS.text};">Iniciar Sesión como Empleado</h2>
      <p style="color: #777; font-size: 14px; margin: 0 0 20px;">Accede para registrar tu asistencia, solicitar días libres y ver tus vacaciones.</p>

      <div>
        <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Correo Electrónico</label>
        <div style="position: relative;">
          <input type="email" id="email" placeholder="tu@email.com" 
            style="width: 100%; padding: 12px 12px 12px 40px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.3s;"
            onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#777" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 6 8-6v10zm-8-7L4 6l8 6 8-6z"/>
          </svg>
        </div>
      </div>

      <div>
        <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Contraseña</label>
        <div style="position: relative;">
          <input type="password" id="password" placeholder="••••••••"
            style="width: 100%; padding: 12px 12px 12px 40px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px; outline: none; transition: border-color 0.3s;"
            onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#777" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 6h2v2h-2v-2zm0-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          </svg>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
          <a href="#" style="color: ${COLORS.primary}; text-decoration: none; font-size: 14px; font-weight: 600;">¿Olvidaste tu contraseña?</a>
        </div>
      </div>

      <button onclick="window.loginUser()" style="
        background: ${COLORS.primary};
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 8px;
        box-shadow: 0 4px 12px rgba(0,150,136,0.2);
        transition: transform 0.2s, box-shadow 0.2s;
      " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 16px rgba(0,150,136,0.3)';"
        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,150,136,0.2)';">
        Iniciar Sesión
      </button>
    `;
  }
};

const loginUser = () => {
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  if (!email || !password) {
    alert('Por favor, completa todos los campos');
    return;
  }

  // Simular login (en producción, llamar a tu API)
  const isEmployer = document.getElementById('tab-empleador')?.style.background === COLORS.buttonSecondary;
  const role = isEmployer ? 'employer' : 'employee';

  setTimeout(() => {
    loginAs(role);
  }, 300);
};

// ─── DASHBOARD EMPLEADOR ─────────────────────────────────────

const renderEmployerDashboard = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="
      background: ${COLORS.background};
      min-height: 100vh;
      font-family: 'Segoe UI', system-ui, sans-serif;
    ">
      <div style="
        background: ${COLORS.primary};
        color: white;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      ">
        <h1 style="margin: 0; font-weight: 700; font-size: 20px;">💼 Panel del Empleador</h1>
        <button onclick="window.logout()" style="
          background: ${COLORS.buttonDanger};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        ">Cerrar sesión</button>
      </div>

      <div style="padding: 40px 24px; display: flex; flex-direction: column; align-items: center; gap: 32px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: ${COLORS.text}; margin: 0; font-size: 28px; font-weight: 700; text-align: center;">¿Qué te gustaría hacer hoy? 🌸</h2>

        <button onclick="window.showAddEmployee()" style="
          background: ${COLORS.secondary};
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(76,175,80,0.3);
          transition: transform 0.2s;
          width: 100%;
          max-width: 500px;
        " onmouseover="this.style.transform='scale(1.02)';"
          onmouseout="this.style.transform='scale(1)';">
          ➕ Agregar un nuevo empleado
        </button>

        <div style="background: white; padding: 28px; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); width: 100%;">
          <h3 style="color: ${COLORS.primary}; margin-top: 0; margin-bottom: 16px; font-size: 20px; font-weight: 700;">Tus herramientas 💖</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <button onclick="alert('Función en desarrollo')" style="
              background: ${COLORS.buttonSecondary};
              color: ${COLORS.primary};
              border: none;
              border-radius: 12px;
              padding: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">🗓️ Asignar días libres y vacaciones</button>
            <button onclick="alert('Función en desarrollo')" style="
              background: ${COLORS.buttonSecondary};
              color: ${COLORS.primary};
              border: none;
              border-radius: 12px;
              padding: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">📊 Ver historial de asistencia</button>
            <button onclick="alert('Función en desarrollo')" style="
              background: ${COLORS.buttonSecondary};
              color: ${COLORS.primary};
              border: none;
              border-radius: 12px;
              padding: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">🔍 Filtrar empleados por criterio</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

// ─── DASHBOARD EMPLEADO ───────────────────────────────────────

const renderEmployeeDashboard = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="
      background: ${COLORS.background};
      min-height: 100vh;
      font-family: 'Segoe UI', system-ui, sans-serif;
    ">
      <div style="
        background: ${COLORS.secondary};
        color: white;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      ">
        <h1 style="margin: 0; font-weight: 700; font-size: 20px;">🌸 Panel del Empleado</h1>
        <button onclick="window.logout()" style="
          background: ${COLORS.buttonDanger};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        ">Cerrar sesión</button>
      </div>

      <div style="padding: 40px 24px; display: flex; flex-direction: column; align-items: center; gap: 32px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: ${COLORS.text}; margin: 0; font-size: 28px; font-weight: 700; text-align: center;">Tus herramientas del día 💕</h2>

        <div style="background: white; padding: 28px; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); width: 100%;">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <button onclick="alert('Función en desarrollo')" style="
              background: ${COLORS.buttonSecondary};
              color: ${COLORS.primary};
              border: none;
              border-radius: 12px;
              padding: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">🕒 Registrar entrada y salida</button>
            <button onclick="alert('Función en desarrollo')" style="
              background: ${COLORS.buttonSecondary};
              color: ${COLORS.primary};
              border: none;
              border-radius: 12px;
              padding: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">📊 Ver tus días libres y vacaciones</button>
            <button onclick="alert('Función en desarrollo')" style="
              background: ${COLORS.buttonSecondary};
              color: ${COLORS.primary};
              border: none;
              border-radius: 12px;
              padding: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">🌸 Solicitar días libres o vacaciones</button>
            <button onclick="window.location.href='./pages/'" style="
              background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
              color: white;
              border: none;
              border-radius: 12px;
              padding: 12px;
              font-weight: 600;
              cursor: pointer;
              width: 100%;
            ">📈 Consultar historial detallado</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

// ─── FORMULARIO: AGREGAR EMPLEADO ────────────────────────────

const showAddEmployee = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div style="background: ${COLORS.background}; min-height: 100vh; font-family: 'Segoe UI', sans-serif; padding: 20px;">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      ">
        <h1 style="color: ${COLORS.primary}; margin: 0; font-weight: 700; font-size: 24px;">📝 ¡Hola, nuevo equipo! 🌈</h1>
        <button onclick="window.renderEmployerDashboard()" style="
          background: ${COLORS.primary};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        ">← Volver</button>
      </div>

      <div style="
        background: white;
        padding: 32px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        max-width: 600px;
        margin: 0 auto;
      ">
        <form id="employeeForm" style="display: flex; flex-direction: column; gap: 18px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">DNI</label>
            <input type="number" name="dni" required 
              style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none; transition: border-color 0.3s;"
              onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Nombre</label>
              <input type="text" name="nombre" required 
                style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none;"
                onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
            </div>
            <div>
              <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Apellido</label>
              <input type="text" name="apellido" required 
                style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none;"
                onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
            </div>
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Correo electrónico</label>
            <input type="email" name="correo" required 
              style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none;"
              onfocus="this.style.borderColor='#4CAF50';" onblur="this.style.borderColor='#e2e8f0';">
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Contraseña</label>
            <input type="password" name="contrasena" required 
              style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none;"
              onfocus="this.style.borderColor='#FF9800';" onblur="this.style.borderColor='#e2e8f0';">
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Cargo</label>
            <input type="text" name="cargo" required 
              style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none;"
              onfocus="this.style.borderColor='#009688';" onblur="this.style.borderColor='#e2e8f0';">
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Fecha de contratación</label>
            <input type="date" name="fecha_contratacion" required 
              style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none;"
              onfocus="this.style.borderColor='#4CAF50';" onblur="this.style.borderColor='#e2e8f0';">
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: ${COLORS.text}; font-weight: 600; font-size: 14px;">Teléfono (opcional)</label>
            <input type="tel" name="telefono" 
              style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 16px; outline: none;"
              onfocus="this.style.borderColor='#FF9800';" onblur="this.style.borderColor='#e2e8f0';">
          </div>

          <button type="submit" style="
            background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
            color: white;
            border: none;
            border-radius: 14px;
            padding: 16px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            margin-top: 8px;
            box-shadow: 0 6px 20px rgba(0,150,136,0.3);
            transition: transform 0.2s, box-shadow 0.2s;
            width: 100%;
          " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 8px 24px rgba(0,150,136,0.4)';"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 6px 20px rgba(0,150,136,0.3)';">
            💖 Agregar con cariño
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

// ─── RENDERIZADO PRINCIPAL ───────────────────────────────────

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

// ─── EXPOSICIÓN GLOBAL ───────────────────────────────────────

(window as any).loginAs = loginAs;
(window as any).logout = logout;
(window as any).renderEmployerDashboard = renderEmployerDashboard;
(window as any).showAddEmployee = showAddEmployee;
(window as any).renderEmployeeDashboard = renderEmployeeDashboard;
(window as any).showLoginForm = showLoginForm;
(window as any).switchToEmployer = switchToEmployer;
(window as any).switchToEmployee = switchToEmployee;
(window as any).loginUser = loginUser;

// ─── INICIAR ─────────────────────────────────────────────────

renderApp();