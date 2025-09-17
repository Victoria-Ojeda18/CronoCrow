// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde mi backend con Node.js y Express! 🚀');
});

// Ruta de ejemplo con JSON
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, nombre: 'Juan' },
    { id: 2, nombre: 'María' }
  ]);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

