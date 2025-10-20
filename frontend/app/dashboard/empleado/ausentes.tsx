// app/dashboard/empledo/ausentes.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeeAbsencesPage() {
  // Datos simulados de ausencias
  const absences = [
    { id: 1, date: '16/05/2025', day: 'Viernes', reason: 'No registró entrada ni salida' },
    { id: 2, date: '02/05/2025', day: 'Viernes', reason: 'No registró entrada ni salida' },
    { id: 3, date: '26/04/2025', day: 'Sábado', reason: 'No registró entrada ni salida' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Mis Ausencias</ThemedText>
        <ThemedText style={styles.subtitle}>Días en los que no registraste tu asistencia</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {absences.length > 0 ? (
          absences.map((absence) => (
            <View key={absence.id} style={styles.absenceCard}>
              <View style={styles.absenceHeader}>
                <View>
                  <ThemedText style={styles.absenceDay}>{absence.day}</ThemedText>
                  <ThemedText style={styles.absenceDate}>{absence.date}</ThemedText>
                </View>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>Ausente</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.absenceReason}>{absence.reason}</ThemedText>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <ThemedText>No tenés ausencias registradas.</ThemedText>
          </View>
        )}

        {/* Nota informativa */}
        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            ⚠️ Si no registrás tu entrada y salida en el día, el sistema lo marca como ausencia.
            Recuerda registrar tu asistencia diaria.
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
    marginBottom: 8,
  },
  absenceDay: {
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
  absenceReason: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
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