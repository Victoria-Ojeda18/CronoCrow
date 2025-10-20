// app/dashboard/empleado/page.tsx
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function EmployeeDashboardPage() {
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<'checkIn' | 'checkOut' | null>(null);

  const openConfirmModal = (action: 'checkIn' | 'checkOut') => {
    setActionToConfirm(action);
    setConfirmModalVisible(true);
  };

  const confirmAction = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (actionToConfirm === 'checkIn') {
      setCheckInTime(time);
    } else if (actionToConfirm === 'checkOut') {
      setCheckOutTime(time);
    }

    setConfirmModalVisible(false);
    setActionToConfirm(null);
  };

  // Datos simulados
  const timeOff = [
    { date: '15/05/2025', type: 'Día Libre', status: 'Aprobado' },
    { date: '20/05/2025 - 27/05/2025', type: 'Vacaciones', status: 'Aprobado' },
  ];

  const attendanceHistory = [
    { day: 'Lunes', date: '12/05', status: 'Tarde', time: '09:15' },
    { day: 'Martes', date: '13/05', status: 'A tiempo', time: '08:58' },
    { day: 'Miércoles', date: '14/05', status: 'Tarde', time: '09:05' },
    { day: 'Jueves', date: '15/05', status: 'A tiempo', time: '08:55' },
    { day: 'Viernes', date: '16/05', status: 'Ausente', time: '-' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Hola, Juan Pérez</ThemedText>
        <ThemedText style={styles.subtitle}>Empleado - Cocina</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Tarjetas de acción rápida */}
        <View style={styles.actionCards}>
          {/* Botón "Registrar Entrada" */}
          {!checkInTime ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => openConfirmModal('checkIn')}
            >
              <ThemedText style={styles.actionButtonText}>Registrar Entrada</ThemedText>
            </TouchableOpacity>
          ) : !checkOutTime ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => openConfirmModal('checkOut')}
            >
              <ThemedText style={styles.actionButtonText}>Registrar Salida</ThemedText>
            </TouchableOpacity>
          ) : (
            <View style={styles.actionButtonDisabled}>
              <ThemedText style={styles.actionButtonText}>✅ Jornada Finalizada</ThemedText>
            </View>
          )}

          {/* Botón "Solicitar Día Libre" */}
          <Link href="/dashboard/empleado/time-off" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>Solicitar Día Libre</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Resto del contenido */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Mis Días Libres y Vacaciones</ThemedText>
          <View style={styles.timeOffList}>
            {timeOff.map((item, index) => (
              <View key={index} style={styles.timeOffItem}>
                <View>
                  <ThemedText style={styles.timeOffDate}>{item.date}</ThemedText>
                  <ThemedText style={styles.timeOffType}>{item.type}</ThemedText>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    item.status === 'Aprobado' ? styles.approved : styles.pending,
                  ]}
                >
                  <ThemedText style={styles.statusText}>{item.status}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Historial de Asistencia (Últimos 5 días)</ThemedText>
          <View style={styles.attendanceList}>
            {attendanceHistory.map((item, index) => (
              <View key={index} style={styles.attendanceRow}>
                <View style={styles.dayInfo}>
                  <ThemedText style={styles.dayName}>{item.day}</ThemedText>
                  <ThemedText style={styles.dayDate}>{item.date}</ThemedText>
                </View>
                <View style={[styles.statusPill, getStatusStyle(item.status)]}>
                  <ThemedText style={styles.statusPillText}>
                    {item.status} {item.time !== '-' ? `(${item.time})` : ''}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Notificaciones</ThemedText>
          <View style={styles.notification}>
            <ThemedText>✅ Tus vacaciones del 20 al 27/05 han sido aprobadas.</ThemedText>
          </View>
          <View style={styles.notification}>
            <ThemedText>🔔 Recuerda registrar tu entrada al comenzar tu turno.</ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Modal de confirmación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText type="title" style={styles.modalTitle}>
              {actionToConfirm === 'checkIn'
                ? '¿Registrar entrada ahora?'
                : '¿Registrar salida ahora?'}
            </ThemedText>
            <ThemedText style={styles.modalSubtitle}>
              {actionToConfirm === 'checkIn'
                ? 'Se registrará tu hora de entrada actual.'
                : 'Se registrará tu hora de salida actual.'}
            </ThemedText>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setConfirmModalVisible(false)}
              >
                <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmAction}
              >
                <ThemedText style={styles.buttonText}>Confirmar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'A tiempo':
      return { backgroundColor: '#dcfce7', borderColor: '#16a34a' };
    case 'Tarde':
      return { backgroundColor: '#fef3c7', borderColor: '#d97706' };
    case 'Ausente':
      return { backgroundColor: '#fee2e2', borderColor: '#dc2626' };
    default:
      return { backgroundColor: '#e5e7eb', borderColor: '#6b7280' };
  }
};

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
  },
  actionCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4625c7ff',
  },
  actionButtonText: {
    color: '#4625c7ff',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  actionButtonDisabled: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
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
  approved: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
  },
  pending: {
    backgroundColor: '#fef3c7',
    borderColor: '#d97706',
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
  },
  attendanceList: {
    gap: 12,
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayInfo: {},
  dayName: {
    fontWeight: '600',
    color: '#111827',
  },
  dayDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  notification: {
    backgroundColor: '#e6f4ea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  modalTitle: {
    textAlign: 'center',
  },
  modalSubtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
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
  confirmButton: {
    backgroundColor: '#0d9488',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});