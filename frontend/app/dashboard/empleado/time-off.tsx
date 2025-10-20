// app/dashboard/employee/request-time-off/page.tsx
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RequestTimeOffPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [reason, setReason] = useState('');

  // Datos simulados de solicitudes
  const timeOffRequests = [
    { id: 1, date: '15/05/2025', type: 'Día Libre', status: 'Aprobado' },
    { id: 2, date: '20/05/2025 - 27/05/2025', type: 'Vacaciones', status: 'Aprobado' },
    { id: 3, date: '10/06/2025', type: 'Día Libre', status: 'Pendiente' },
  ];

  const handleSubmit = () => {
    if (!selectedDate || !reason.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    Alert.alert('Éxito', 'Solicitud enviada correctamente');
    setModalVisible(false);
    setSelectedDate('');
    setReason('');
  };

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
        <ThemedText type="title">Solicitar Día Libre</ThemedText>
        <ThemedText style={styles.subtitle}>Envía una solicitud a tu empleador</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setModalVisible(true)}
        >
          <ThemedText style={styles.actionButtonText}>+ Solicitar Día Libre</ThemedText>
        </TouchableOpacity>

        {/* Lista de solicitudes */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Mis Solicitudes</ThemedText>
          <View style={styles.timeOffList}>
            {timeOffRequests.map((item) => (
              <View key={item.id} style={styles.timeOffItem}>
                <View>
                  <ThemedText style={styles.timeOffDate}>{item.date}</ThemedText>
                  <ThemedText style={styles.timeOffType}>{item.type}</ThemedText>
                </View>
                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                  <ThemedText style={styles.statusText}>{item.status}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#dcfce7', borderColor: '#16a34a' }]}>
            <ThemedText style={styles.statValue}>2</ThemedText>
            <ThemedText style={styles.statLabel}>Aprobadas</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#fef3c7', borderColor: '#d97706' }]}>
            <ThemedText style={styles.statValue}>1</ThemedText>
            <ThemedText style={styles.statLabel}>Pendientes</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#fee2e2', borderColor: '#dc2626' }]}>
            <ThemedText style={styles.statValue}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Rechazadas</ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText type="title" style={styles.modalTitle}>
              Nueva Solicitud
            </ThemedText>

            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={selectedDate}
              onChangeText={setSelectedDate}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Causa</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Escribe el motivo de tu solicitud..."
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <ThemedText style={styles.buttonText}>Enviar Solicitud</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4625c7ff',
    marginBottom: 24,
  },
  actionButtonText: {
    color: '#4625c7ff',
    fontWeight: '700',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  timeOffList: {
    gap: 12,
  },
  timeOffItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeOffDate: {
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    padding: 12,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  submitButton: {
    backgroundColor: '#0d9488',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});