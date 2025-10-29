// app/dashboard/empleado/request-time-off/page.tsx
const BACKEND_URL = 'http://192.168.1.246:8000';
const EMPLEADO_ID = 1; // ← ID real del usuario

const handleSubmit = async () => {
  if (!selectedDate || !reason.trim()) {
    Alert.alert('Error', 'Completa todos los campos');
    return;
  }

  // Convertir DD/MM/AAAA a AAAA-MM-DD
  const [day, month, year] = selectedDate.split('/');
  const fechaInicio = `${year}-${month}-${day}`;

  try {
    const res = await fetch(`${BACKEND_URL}/api/solicitudes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        empleado_id: EMPLEADO_ID,
        tipo: 'dia_libre',
        fecha_inicio: fechaInicio,
        // fecha_fin: null para día libre
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      Alert.alert('Error', data.detail || 'No se pudo enviar la solicitud');
      return;
    }

    Alert.alert('Éxito', 'Solicitud enviada correctamente');
    setModalVisible(false);
    setSelectedDate('');
    setReason('');
    // Recargar lista de solicitudes
  } catch (err) {
    console.error('Error:', err);
    Alert.alert('Error', 'No se pudo conectar al servidor');
  }
};