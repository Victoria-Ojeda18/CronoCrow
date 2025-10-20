// app/dashboard/empledo/diasLibres.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeeTimeOffPage() {
  // Datos simulados de días libres y vacaciones
  const timeOff = [
    { id: 1, date: '15/05/2025', type: 'Día Libre', status: 'Aprobado' },
    { id: 2, date: '20/05/2025 - 27/05/2025', type: 'Vacaciones', status: 'Aprobado' },
    { id: 3, date: '10/06/2025', type: 'Día Libre', status: 'Pendiente' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Aprobado':
        return { backgroundColor: '#dcfce7', borderColor: '#16a34a' };
      case 'Pendiente':
        return { backgroundColor: '#fef3c7', borderColor: '#d97706' };
      case 'Rechazado':
        return { backgroundColor: '#fee2e2', borderColor: '#dc2626' };
      default:
        return { backgroundColor: '#e5e7eb', borderColor: '#6b7280' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Mis Días Libres</ThemedText>
        <ThemedText style={styles.subtitle}>Vacaciones y días libres asignados</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {timeOff.length > 0 ? (
          timeOff.map((item) => (
            <View key={item.id} style={styles.timeOffCard}>
              <View style={styles.timeOffHeader}>
                <View>
                  <ThemedText style={styles.timeOffDate}>{item.date}</ThemedText>
                  <ThemedText style={styles.timeOffType}>{item.type}</ThemedText>
                </View>
                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                  <ThemedText style={styles.statusText}>{item.status}</ThemedText>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <ThemedText>No tenés días libres ni vacaciones asignadas.</ThemedText>
          </View>
        )}

        {/* Nota informativa */}
        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            💡 Puedes solicitar días libres o vacaciones desde la sección "Solicitar Día Libre".
            El empleador revisará tu solicitud y te notificará el resultado.
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
    borderColor: '#e5e7eb',
  },
  timeOffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeOffDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  timeOffType: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
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