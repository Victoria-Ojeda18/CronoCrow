// app/employees/page.tsx
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = 'http://192.168.1.246:8000';

export default function EmployeesListPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/empleados?empleador_id=${userId}`);
      const data = await res.json();
      setEmployees(data.empleados || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0d9488" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Lista de Empleados</ThemedText>
        <ThemedText style={styles.subtitle}>Datos de tus empleados</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {employees.map((emp) => (
          <View key={emp.id} style={styles.employeeCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>{emp.nombre} {emp.apellido}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.value}>{emp.telefono}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{emp.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Rubro:</Text>
              <Text style={[styles.value, styles.rubro]}>{emp.rubro}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Francos:</Text>
              <Text style={styles.value}>{emp.francos}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#afceecff' },
  header: { padding: 20, backgroundColor: '#afceecff', borderBottomWidth: 1, borderBottomColor: '#9db9f0ff' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  content: { padding: 20, gap: 16 },
  employeeCard: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  row: { flexDirection: 'row', marginBottom: 8 },
  label: { fontWeight: '600', color: '#111827', width: 120, fontSize: 14 },
  value: { flex: 1, color: '#4b5563', fontSize: 14 },
  rubro: { color: '#0d9488', fontWeight: '600' },
});