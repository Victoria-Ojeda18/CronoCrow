// app/dashboard/page.tsx
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Panel de Control</ThemedText>
        <ThemedText style={styles.subtitle}>Bienvenido de nuevo, Administrador</ThemedText>
      </ThemedView>

      {/* Estadísticas */}
      <ScrollView contentContainerStyle={styles.statsContainer}>
        <View style={styles.statsRow}>
          {/* Ausentes Hoy */}
          <Link href="/dashboard/attendance/page" asChild>
            <TouchableOpacity style={[styles.statCard, { backgroundColor: '#ef4444' }]}>
              <ThemedText style={styles.statIcon}>❌</ThemedText>
              <ThemedText style={styles.statTitle}>Ausentes Hoy</ThemedText>
              <ThemedText style={styles.statValue}>3</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Total Empleados */}
          <Link href="/dashboard/employees/page" asChild>
            <TouchableOpacity style={[styles.statCard, { backgroundColor: '#10b981' }]}>
              <ThemedText style={styles.statIcon}>👥</ThemedText>
              <ThemedText style={styles.statTitle}>Total Empleados</ThemedText>
              <ThemedText style={styles.statValue}>15</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Presentes Hoy */}
          <Link href="/dashboard/attendance/page" asChild>
            <TouchableOpacity style={[styles.statCard, { backgroundColor: '#3b82f6' }]}>
              <ThemedText style={styles.statIcon}>✅</ThemedText>
              <ThemedText style={styles.statTitle}>Presentes Hoy</ThemedText>
              <ThemedText style={styles.statValue}>12</ThemedText>
            </TouchableOpacity>
          </Link>

          {/* Días Libres Pendientes */}
          <Link href="/dashboard/time-off/page" asChild>
            <TouchableOpacity style={[styles.statCard, { backgroundColor: '#f59e0b' }]}>
              <ThemedText style={styles.statIcon}>📅</ThemedText>
              <ThemedText style={styles.statTitle}>Días Libres Pendientes</ThemedText>
              <ThemedText style={styles.statValue}>3</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Empleados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Empleados</ThemedText>
            <View style={styles.sectionActions}>
              <TouchableOpacity style={styles.filterButton}>
                <ThemedText style={styles.buttonText}>Filtrar</ThemedText>
              </TouchableOpacity>
              <Link href="/dashboard/employees/add/page" asChild>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: '#0d9488' }]}>
                  <ThemedText style={styles.buttonText}>Agregar</ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          <Text style={styles.sectionDescription}>Lista de todos los empleados activos</Text>
          <View style={styles.employeeList}>
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} style={styles.employeeItem}>
                <View style={styles.avatar}>
                  <ThemedText style={styles.avatarText}>JP</ThemedText>
                </View>
                <View style={styles.employeeInfo}>
                  <ThemedText style={styles.employeeName}>Juan Pérez</ThemedText>
                  <ThemedText style={styles.employeeRole}>Cocinero</ThemedText>
                </View>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>Activo</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Próximos Días Libres */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Próximos Días Libres</ThemedText>
          <Text style={styles.sectionDescription}>Días libres y vacaciones programadas</Text>
          <View style={styles.timeOffList}>
            {[
              { name: 'Carlos Gómez', date: '20/05/2025 - 27/05/2025', type: 'Vacaciones' },
              { name: 'Ana Rodríguez', date: '15/05/2025', type: 'Día Libre' },
              { name: 'Juan Pérez', date: '18/05/2025', type: 'Día Libre' },
            ].map((item, index) => (
              <View key={index} style={styles.timeOffItem}>
                <View style={styles.avatar}>
                  <ThemedText style={styles.avatarText}>{item.name.substring(0, 2)}</ThemedText>
                </View>
                <View style={styles.timeOffInfo}>
                  <ThemedText style={styles.timeOffName}>{item.name}</ThemedText>
                  <ThemedText style={styles.timeOffDate}>{item.date}</ThemedText>
                </View>
                <View style={[styles.badge, item.type === 'Vacaciones' ? styles.vacationBadge : styles.dayOffBadge]}>
                  <ThemedText style={styles.badgeText}>{item.type}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Estadísticas de Asistencia */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Estadísticas de Asistencia</ThemedText>
          <Text style={styles.sectionDescription}>Resumen de los últimos 7 días</Text>
          <View style={styles.chartPlaceholder}>
            <ThemedText style={styles.chartText}>Gráfico de estadísticas de asistencia (últimos 7 días)</ThemedText>
          </View>
        </View>

        {/* Actividad Reciente */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Actividad Reciente</ThemedText>
          <Text style={styles.sectionDescription}>Últimas acciones en el sistema</Text>
          <View style={styles.activityList}>
            {[
              { user: 'ML', action: 'María López registró entrada', time: 'Hace 10 minutos' },
              { user: 'JP', action: 'Juan Pérez solicitó día libre', time: 'Hace 30 minutos' },
              { user: 'RS', action: 'Roberto Sánchez registró salida', time: 'Hace 1 hora' },
              { user: 'AR', action: 'Ana Rodríguez día libre aprobado', time: 'Hace 2 horas' },
            ].map((item, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={[styles.avatar, { backgroundColor: '#0d9488' }]}>
                  <ThemedText style={styles.avatarText}>{item.user}</ThemedText>
                </View>
                <View style={styles.activityInfo}>
                  <ThemedText style={styles.activityAction}>{item.action}</ThemedText>
                  <ThemedText style={styles.activityTime}>{item.time}</ThemedText>
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
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#ffffff',
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  employeeList: {
    gap: 8,
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0d9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  employeeRole: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  timeOffList: {
    gap: 8,
  },
  timeOffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  timeOffInfo: {
    flex: 1,
    marginLeft: 12,
  },
  timeOffName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  timeOffDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vacationBadge: {
    backgroundColor: '#3b82f6',
  },
  dayOffBadge: {
    backgroundColor: '#f59e0b',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  chartPlaceholder: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  activityAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  activityTime: {
    fontSize: 14,
    color: '#6b7280',
  },
});