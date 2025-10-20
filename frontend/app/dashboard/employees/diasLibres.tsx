// app/employees/diasLibres.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployerTimeOffPage() {
  // Datos simulados: 5 empleados con días libres
  const timeOffEmployees = [
    { id: 1, name: 'Juan Pérez', department: 'Cocina', date: '15/05/2025', day: 'Jueves' },
    { id: 2, name: 'María López', department: 'Servicio', date: '16/05/2025', day: 'Viernes' },
    { id: 3, name: 'Carlos Gómez', department: 'Bar', date: '20/05/2025', day: 'Martes' },
    { id: 4, name: 'Ana Rodríguez', department: 'Administración', date: '23/05/2025', day: 'Viernes' },
    { id: 5, name: 'Roberto Sánchez', department: 'Cocina', date: '30/05/2025', day: 'Viernes' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Días Libres Asignados</ThemedText>
        <ThemedText style={styles.subtitle}>Empleados con días libres programados</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {timeOffEmployees.length > 0 ? (
          timeOffEmployees.map((employee) => (
            <View key={employee.id} style={styles.timeOffCard}>
              <View style={styles.timeOffHeader}>
                <View>
                  <ThemedText style={styles.employeeName}>{employee.name}</ThemedText>
                  <ThemedText style={styles.department}>{employee.department}</ThemedText>
                </View>
                <View style={styles.dateBadge}>
                  <ThemedText style={styles.dateText}>
                    {employee.day}, {employee.date}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <ThemedText>No hay días libres asignados.</ThemedText>
          </View>
        )}

        {/* Nota informativa */}
        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            💡 Puedes asignar nuevos días libres desde la sección de gestión de empleados.
            Los empleados recibirán una notificación automática.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#afceecff',
  },
  header: {
    padding: 20,
    backgroundColor: '#afceecff',
    borderBottomWidth: 1,
    borderBottomColor: '#9db9f0ff',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  timeOffCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  timeOffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  department: {
    fontSize: 14,
    color: '#0d9488', // Verde esmeralda para el rubro
    fontWeight: '500',
  },
  dateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#16a34a',
  },
  dateText: {
    color: '#16a34a',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#e6f4ea',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#16a34a',
  },
  infoText: {
    fontSize: 14,
    color: '#065f46',
    lineHeight: 20,
  },
});