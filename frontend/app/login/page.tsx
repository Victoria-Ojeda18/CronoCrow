// app/login/page.tsx
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = 'http://192.168.1.246:8000';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.detail || 'Credenciales incorrectas');
        return;
      }

      // Guardar datos del usuario
      await AsyncStorage.setItem('userId', String(data.id));
      await AsyncStorage.setItem('userEmail', data.email);
      await AsyncStorage.setItem('userRol', data.rol);

      if (data.rol === 'empleador') {
  // Redirige al dashboard del EMPLEADOR
      router.replace('/dashboard/employees');
    } else if (data.rol === 'empleado') {
      // Redirige al dashboard del EMPLEADO
      router.replace('/dashboard/empleado');
    } else {
        Alert.alert('Error', 'Rol no reconocido');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.logo}>
            CronoCrow
          </ThemedText>

          <ThemedText type="subtitle" style={styles.title}>
            Iniciar Sesión
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Accede para gestionar tu equipo o ver tus horarios
          </ThemedText>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Correo Electrónico</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Contraseña</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#9ca3af"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <ThemedText style={styles.footerText}>
            ¿No tienes cuenta?{' '}
            <ThemedText style={{ color: '#be5eeb', fontWeight: 'bold' }}>
              Regístrate
            </ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40 },
  content: { width: '100%', maxWidth: 350, alignSelf: 'center', paddingHorizontal: 24 },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#c29ef3', textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#9ca3af', textAlign: 'center', marginBottom: 32 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', color: '#9ca3af', marginBottom: 6 },
  input: { backgroundColor: '#ffffff', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, height: 50 },
  button: { backgroundColor: '#0d9488', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  footer: { padding: 20, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1f2937' },
  footerText: { color: '#9ca3af', fontSize: 14, textAlign: 'center' },
});