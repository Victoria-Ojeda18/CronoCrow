// app/login/page.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'empleador' | 'empleado'>('empleador'); // Estado para la pestaña activa

  // Estados para los campos de cada rol
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleLogin = () => {
    if (activeTab === 'empleador') {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // empleador
        router.replace('../dashboard/employees/page'); 
      }, 800);
    } else {
      if (!employeeId || !password) {
        Alert.alert('Error', 'Por favor ingresa tu ID de empleado y contraseña');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // 🚩 Reemplaza esta ruta con la que necesites para empleado
        router.replace('../dashboard/empleado/page'); // 👈 INSERTA RUTA PARA EMPLEADO AQUÍ
      }, 800);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        {/* Logo */}
        <ThemedText type="title" style={styles.logo}>
          CronoCrow
        </ThemedText>

        {/* Título y subtítulo */}
        <ThemedText type="subtitle" style={styles.title}>
          Iniciar Sesión
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Accede para gestionar a tu equipo o ver tus horarios
        </ThemedText>

        {/* Pestañas: Empleador / Empleado */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'empleador' && styles.activeTab]}
            onPress={() => setActiveTab('empleador')}
          >
            <ThemedText style={[styles.tabText, activeTab === 'empleador' && styles.activeTabText]}>
              Empleador
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'empleado' && styles.activeTab]}
            onPress={() => setActiveTab('empleado')}
          >
            <ThemedText style={[styles.tabText, activeTab === 'empleado' && styles.activeTabText]}>
              Empleado
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Formulario según la pestaña activa */}
        <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
          {activeTab === 'empleador' ? (
            <>
              {/* Campo de Correo Electrónico */}
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

              {/* Campo de Contraseña */}
              <View style={styles.inputContainer}>
                <View style={styles.labelRow}>
                  <ThemedText style={styles.label}>Contraseña</ThemedText>
                  <Link href="/forgot-password" asChild>
                    <TouchableOpacity>
                      <ThemedText style={styles.forgotPassword}>
                        ¿Olvidaste tu contraseña?
                      </ThemedText>
                    </TouchableOpacity>
                  </Link>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </>
          ) : (
            <>
              {/* Campo de ID de Empleado */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>ID de Empleado</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Tu ID de empleado"
                  value={employeeId}
                  onChangeText={setEmployeeId}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              {/* Campo de Contraseña */}
              <View style={styles.inputContainer}>
                <View style={styles.labelRow}>
                  <ThemedText style={styles.label}>Contraseña</ThemedText>
                  <Link href="/forgot-password" asChild>
                    <TouchableOpacity>
                      <ThemedText style={styles.forgotPassword}>
                        ¿Olvidaste tu contraseña?
                      </ThemedText>
                    </TouchableOpacity>
                  </Link>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </>
          )}

          {/* Botón de Iniciar Sesión */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
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
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c29ef3ff',
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7461efff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
  },
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 350,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#1f2937',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#0d9488',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9ca3af',
  },
  activeTabText: {
    color: '#cdb5f4ff',
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    paddingBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#be5eebff',
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    height: 48,
    width: '100%',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#0d9488',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});