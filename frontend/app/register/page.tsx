// app/register/page.tsx
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native';

// 🔥 Tu IP local correcta
const BACKEND_URL = 'http://192.168.1.246:8000';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState<'empleador' | 'empleado'>('empleador');

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(''); // Formato: AAAA-MM-DD
  const [empleadorId, setEmpleadorId] = useState('');

  const handleRegister = async () => {
    // Validaciones básicas
    if (!nombre || !apellido || !email || !telefono || !password || !fechaNacimiento) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (rol === 'empleado' && !empleadorId) {
      Alert.alert('Error', 'El ID del empleador es obligatorio para empleados');
      return;
    }

    // Validar formato de fecha (opcional pero útil)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
      Alert.alert('Error', 'La fecha debe ser AAAA-MM-DD (ej: 1990-05-15)');
      return;
    }

    setLoading(true);
    try {
      // Preparar datos para enviar
      const userData = {
        nombre,
        apellido,
        email,
        telefono,
        password,
        fecha_nacimiento: fechaNacimiento,
        rol,
        empleador_id: rol === 'empleado' ? parseInt(empleadorId, 10) : null,
      };

      // Enviar al backend
      const response = await fetch(`${BACKEND_URL}/api/auth/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // El backend devolvió error (400, 409, etc.)
        Alert.alert('Registro fallido', data.detail || 'No se pudo crear la cuenta');
        return;
      }

      // ✅ Registro exitoso
      Alert.alert(
        '¡Cuenta creada!',
        'Tu usuario se ha registrado correctamente.',
        [
          {
            text: 'Ir al login',
            onPress: () => router.replace('/login'), // 👈 Redirige al login
          },
        ]
      );

    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor. ¿Está encendido?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Crear Cuenta</Text>

        {/* Selector de rol */}
        <View style={styles.rolContainer}>
          <TouchableOpacity
            style={[styles.rolButton, rol === 'empleador' && styles.rolActive]}
            onPress={() => setRol('empleador')}
          >
            <Text style={[styles.rolText, rol === 'empleador' && styles.rolTextActive]}>Empleador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rolButton, rol === 'empleado' && styles.rolActive]}
            onPress={() => setRol('empleado')}
          >
            <Text style={[styles.rolText, rol === 'empleado' && styles.rolTextActive]}>Empleado</Text>
          </TouchableOpacity>
        </View>

        {/* Campos comunes */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento (AAAA-MM-DD)"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />

        {/* Campo solo para empleados */}
        {rol === 'empleado' && (
          <TextInput
            style={styles.input}
            placeholder="ID del empleador"
            value={empleadorId}
            onChangeText={setEmpleadorId}
            keyboardType="numeric"
          />
        )}

        {/* Botón de registro */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </Text>
        </TouchableOpacity>

        {/* Enlace a login */}
        <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>

        {/* Espacio extra para scroll */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scroll: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  rolContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  rolButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  rolActive: {
    backgroundColor: '#0d9488',
  },
  rolText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  rolTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    height: 50,
  },
  button: {
    backgroundColor: '#0d9488',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    padding: 12,
    alignItems: 'center',
  },
  loginText: {
    color: '#be5eeb',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});