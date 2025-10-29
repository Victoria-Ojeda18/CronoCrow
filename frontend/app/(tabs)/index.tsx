// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo o título */}
        <Text style={styles.logo}>CronoCrow</Text>
        <Text style={styles.subtitle}>Gestión de horarios y asistencias</Text>

        {/* Botón: Iniciar Sesión */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push('/login/page')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Botón: Registrarse */}
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => router.push('/register/page')}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#c29ef3',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    width: '100%',
    maxWidth: 300,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3, // para sombra en Android
    shadowColor: '#000', // para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButton: {
    backgroundColor: '#0d9488', // verde suave
  },
  registerButton: {
    backgroundColor: '#4f46e5', // índigo
    borderWidth: 2,
    borderColor: '#c29ef3',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});