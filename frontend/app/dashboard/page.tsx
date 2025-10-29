// app/dashboard/page.tsx
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome6 } from '@expo/vector-icons';

const BACKEND_URL = 'http://192.168.1.246:8000';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      // Redirigir al login si no hay sesión
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/empleador/dashboard/${userId}`);
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error al cargar dashboard:', error);
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

  const stats = data?.estadisticas || {};
  const empleador = data?.empleador || {};

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Panel de Control</ThemedText>
        <ThemedText style={styles.subtitle}>Bienvenido, {empleador.nombre || 'Administrador'}</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#ef4444' }]}>
            <FontAwesome6 name="x" size={24} color="#fff" />
            <ThemedText style={styles.statTitle}>Ausentes Hoy</ThemedText>
            <ThemedText style={styles.statValue}>{stats.ausentes_hoy || 0}</ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#10b981' }]}>
            <FontAwesome6 name="users" size={24} color="#fff" />
            <ThemedText style={styles.statTitle}>Total Empleados</ThemedText>
            <ThemedText style={styles.statValue}>{stats.total_empleados || 0}</ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#3b82f6' }]}>
            <FontAwesome6 name="check" size={24} color="#fff" />
            <ThemedText style={styles.statTitle}>Presentes Hoy</ThemedText>
            <ThemedText style={styles.statValue}>{stats.presentes_hoy || 0}</ThemedText>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#f59e0b' }]}>
            <FontAwesome6 name="calendar-days" size={24} color="#fff" />
            <ThemedText style={styles.statTitle}>Días Libres Pend.</ThemedText>
            <ThemedText style={styles.statValue}>{stats.dias_libres_pendientes || 0}</ThemedText>
          </View>
        </View>

        {/* Empleados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Empleados</ThemedText>
            <Link href="/employees/agregarEmpleado" asChild>
              <TouchableOpacity style={[styles.addButton, { backgroundColor: '#0d9488' }]}>
                <ThemedText style={styles.buttonText}>Agregar</ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
          <Text style={styles.sectionDescription}>Lista de empleados activos</Text>
          <View style={styles.employeeList}>
            {(data?.empleados || []).map((emp: any) => (
              <View key={emp.id} style={styles.employeeItem}>
                <View style={styles.avatar}>
                  <ThemedText style={styles.avatarText}>
                    {emp.nombre.substring(0,1)}{emp.apellido.substring(0,1)}
                  </ThemedText>
                </View>
                <View style={styles.employeeInfo}>
                  <ThemedText style={styles.employeeName}>{emp.nombre} {emp.apellido}</ThemedText>
                  <ThemedText style={styles.employeeRole}>{emp.rubro || 'Sin rubro'}</ThemedText>
                </View>
                <View style={[styles.statusBadge, emp.estado_hoy === 'Presente' ? styles.presente : styles.ausente]}>
                  <ThemedText style={styles.statusText}>{emp.estado_hoy}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Días libres */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Próximos Días Libres</ThemedText>
          <View style={styles.timeOffList}>
            {(data?.dias_libres || []).map((dl: any, index: number) => (
              <View key={index} style={styles.timeOffItem}>
                <View style={styles.timeOffInfo}>
                  <ThemedText style={styles.timeOffName}>{dl.nombre} {dl.apellido}</ThemedText>
                  <ThemedText style={styles.timeOffDate}>{dl.fecha_inicio} ({dl.tipo})</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 20, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  statsContainer: { padding: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20, flexWrap: 'wrap' },
  statCard: { 
    width: '48%', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 10,
  },
  statTitle: { fontSize: 12, fontWeight: '600', color: '#ffffff', textAlign: 'center', marginTop: 6 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginTop: 4 },
  section: { marginBottom: 20, backgroundColor: '#ffffff', borderRadius: 8, padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  addButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  buttonText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  sectionDescription: { fontSize: 14, color: '#6b7280', marginBottom: 16 },
  employeeList: { gap: 8 },
  employeeItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#f9fafb', borderRadius: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#0d9488', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  employeeInfo: { flex: 1 },
  employeeName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  employeeRole: { fontSize: 14, color: '#6b7280' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  presente: { backgroundColor: '#10b981' },
  ausente: { backgroundColor: '#ef4444' },
  statusText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  timeOffList: { gap: 8 },
  timeOffItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#f9fafb', borderRadius: 8 },
  timeOffInfo: { flex: 1, marginLeft: 12 },
  timeOffName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  timeOffDate: { fontSize: 14, color: '#6b7280' },
});