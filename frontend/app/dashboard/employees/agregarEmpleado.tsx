// app/employees/agregarEmpleado.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const BACKEND_URL = 'http://192.168.1.246:8000';

export default function AddEmployeePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    rubro: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = ['nombre', 'apellido', 'telefono', 'email', 'rubro'];
    const missing = requiredFields.filter((field) => !formData[field as keyof typeof formData].trim());
    if (missing.length > 0) {
      Alert.alert('Error', 'Completa todos los campos obligatorios.');
      return;
    }

    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Alert.alert('Error', 'No estás autenticado');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/empleados`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          email: formData.email,
          fecha_nacimiento: formData.fechaNacimiento || '1990-01-01',
          rol: 'empleado',
          empleador_id: parseInt(userId, 10),
          categoria: formData.rubro,
          password: '123456', // temporal
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        Alert.alert('Error', data.detail || 'No se pudo crear el empleado');
        return;
      }

      Alert.alert('Éxito', 'Empleado agregado correctamente');
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Agregar Empleado</ThemedText>
        <ThemedText style={styles.subtitle}>Completa los datos del nuevo empleado</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput style={styles.input} value={formData.nombre} onChangeText={(v) => handleChange('nombre', v)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellido *</Text>
            <TextInput style={styles.input} value={formData.apellido} onChangeText={(v) => handleChange('apellido', v)} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput style={styles.input} value={formData.telefono} onChangeText={(v) => handleChange('telefono', v)} keyboardType="phone-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput style={styles.input} value={formData.email} onChangeText={(v) => handleChange('email', v)} keyboardType="email-address" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha Nacimiento</Text>
            <TextInput style={styles.input} value={formData.fechaNacimiento} onChangeText={(v) => handleChange('fechaNacimiento', v)} placeholder="AAAA-MM-DD" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rubro *</Text>
            <TextInput style={styles.input} value={formData.rubro} onChangeText={(v) => handleChange('rubro', v)} />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>Agregar Empleado</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#afceecff' },
  header: { padding: 20, backgroundColor: '#afceecff', borderBottomWidth: 1, borderBottomColor: '#9db9f0ff' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  content: { padding: 20, gap: 16 },
  row: { flexDirection: 'row', gap: 12 },
  inputGroup: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' },
  submitButton: { backgroundColor: '#0d9488', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});