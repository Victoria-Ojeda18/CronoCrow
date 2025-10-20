// app/employees/ausentes.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployerAbsencesPage() {
  // Datos simulados: 5 empleados ausentes
  const absentEmployees = [
    { id: 1, name: 'Juan Pérez', department: 'Cocina', date: '15/05/2025', day: 'Jueves' },
    { id: 2, name: 'María López', department: 'Servicio', date: '16/05/2025', day: 'Viernes' },
    { id: 3, name: 'Carlos Gómez', department: 'Bar', date: '20/05/2025', day: 'Martes' },
    { id: 4, name: 'Ana Rodríguez', department: 'Administración', date: '23/05/2025', day: 'Viernes' },
    { id: 5, name: 'Roberto Sánchez', department: 'Cocina', date: '30/05/2025', day: 'Viernes' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Empleados Ausentes</ThemedText>
        <ThemedText style={styles.subtitle}>Lista de empleados que no registraron asistencia</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {absentEmployees.length > 0 ? (
          absentEmployees.map((employee) => (
            <View key={employee.id} style={styles.absenceCard}>
              <View style={styles.absenceHeader}>
                <View>
                  <ThemedText style={styles.employeeName}>{employee.name}</ThemedText>
                  <ThemedText style={styles.absenceDate}>
                    {employee.day}, {employee.date}
                  </ThemedText>
                </View>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>Ausente</ThemedText>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <ThemedText>No hay empleados ausentes registrados.</ThemedText>
          </View>
        )}

        {/* Nota informativa */}
        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            ⚠️ Un empleado se marca como ausente si no registra su entrada y salida en el día.
            Puedes contactarlo para verificar su situación.
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
  absenceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  absenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  absenceDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  statusText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d97706',
  },
  infoText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
});