// app/employees/presentes.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployerPresentEmployeesPage() {
  // Datos simulados: 5 empleados presentes
  const presentEmployees = [
    { id: 1, name: 'Juan Pérez', department: 'Cocina', checkInTime: '08:55' },
    { id: 2, name: 'María López', department: 'Servicio', checkInTime: '09:02' },
    { id: 3, name: 'Carlos Gómez', department: 'Bar', checkInTime: '08:48' },
    { id: 4, name: 'Ana Rodríguez', department: 'Administración', checkInTime: '09:10' },
    { id: 5, name: 'Roberto Sánchez', department: 'Cocina', checkInTime: '08:59' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Empleados Presentes</ThemedText>
        <ThemedText style={styles.subtitle}>Lista de empleados que registraron entrada hoy</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {presentEmployees.length > 0 ? (
          presentEmployees.map((employee) => (
            <View key={employee.id} style={styles.presentCard}>
              <View style={styles.presentHeader}>
                <View>
                  <ThemedText style={styles.employeeName}>{employee.name}</ThemedText>
                  <ThemedText style={styles.department}>{employee.department}</ThemedText>
                </View>
                <View style={styles.timeBadge}>
                  <ThemedText style={styles.timeText}>{employee.checkInTime}</ThemedText>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <ThemedText>No hay empleados presentes registrados.</ThemedText>
          </View>
        )}

        {/* Nota informativa */}
        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            ✅ Un empleado aparece como presente cuando registra su entrada en el sistema.
            La hora mostrada es la registrada al inicio de su turno.
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
  presentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  presentHeader: {
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
  timeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#16a34a',
  },
  timeText: {
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