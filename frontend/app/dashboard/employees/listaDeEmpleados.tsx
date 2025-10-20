// app/employees/page.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployeesListPage() {
  // Datos simulados con TODOS los campos solicitados
  const employees = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      telefono: '299-123-4567',
      email: 'juan.perez@email.com',
      edad: '28',
      fechaNacimiento: '15/03/1996',
      rubro: 'Cocina',
      experiencia: '5',
      faltas: '2',
      asistencias: '118',
      francos: 'Lunes, Martes',
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'López',
      telefono: '299-234-5678',
      email: 'maria.lopez@email.com',
      edad: '32',
      fechaNacimiento: '22/07/1992',
      rubro: 'Servicio',
      experiencia: '8',
      faltas: '0',
      asistencias: '120',
      francos: 'Miércoles, Jueves',
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Gómez',
      telefono: '299-345-6789',
      email: 'carlos.gomez@email.com',
      edad: '26',
      fechaNacimiento: '10/11/1998',
      rubro: 'Bar',
      experiencia: '3',
      faltas: '5',
      asistencias: '115',
      francos: 'Sábado, Domingo',
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Rodríguez',
      telefono: '299-456-7890',
      email: 'ana.rodriguez@email.com',
      edad: '35',
      fechaNacimiento: '05/01/1989',
      rubro: 'Administración',
      experiencia: '10',
      faltas: '1',
      asistencias: '119',
      francos: 'Viernes, Sábado',
    },
    {
      id: 5,
      nombre: 'Roberto',
      apellido: 'Sánchez',
      telefono: '299-567-8901',
      email: 'roberto.sanchez@email.com',
      edad: '30',
      fechaNacimiento: '30/09/1994',
      rubro: 'Cocina',
      experiencia: '6',
      faltas: '3',
      asistencias: '117',
      francos: 'Domingo, Lunes',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Lista de Empleados</ThemedText>
        <ThemedText style={styles.subtitle}>Datos completos de todos los empleados</ThemedText>
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
              <Text style={styles.label}>Edad:</Text>
              <Text style={styles.value}>{emp.edad} años</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha Nac.:</Text>
              <Text style={styles.value}>{emp.fechaNacimiento}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Rubro:</Text>
              <Text style={[styles.value, styles.rubro]}>{emp.rubro}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Experiencia:</Text>
              <Text style={styles.value}>{emp.experiencia} años</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Faltas:</Text>
              <Text style={[styles.value, emp.faltas === '0' ? styles.noFaltas : styles.conFaltas]}>
                {emp.faltas}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Asistencias:</Text>
              <Text style={styles.value}>{emp.asistencias}</Text>
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
  employeeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#111827',
    width: 120,
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: '#4b5563',
    fontSize: 14,
  },
  rubro: {
    color: '#0d9488', // Verde esmeralda
    fontWeight: '600',
  },
  noFaltas: {
    color: '#16a34a', // Verde
    fontWeight: '600',
  },
  conFaltas: {
    color: '#dc2626', // Rojo
    fontWeight: '600',
  },
});