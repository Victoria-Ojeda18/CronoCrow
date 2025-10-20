// app/employees/agregarEmpleado.tsx
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    edad: '',
    fechaNacimiento: '',
    rubro: '',
    experiencia: '',
    faltas: '',
    asistencias: '',
    francos: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = ['nombre', 'apellido', 'telefono', 'email', 'rubro'];
    const missing = requiredFields.filter((field) => !formData[field as keyof typeof formData].trim());

    if (missing.length > 0) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    // Aquí iría la lógica para guardar en Firebase o tu backend
    Alert.alert('Éxito', 'Empleado agregado correctamente');
    // Opcional: limpiar formulario o navegar atrás
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Agregar Empleado</ThemedText>
        <ThemedText style={styles.subtitle}>Completa los datos del nuevo empleado</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Nombre y Apellido */}
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Juan"
              value={formData.nombre}
              onChangeText={(v) => handleChange('nombre', v)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellido *</Text>
            <TextInput
              style={styles.input}
              placeholder="Pérez"
              value={formData.apellido}
              onChangeText={(v) => handleChange('apellido', v)}
            />
          </View>
        </View>

        {/* Teléfono y Email */}
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              placeholder="299-123-4567"
              value={formData.telefono}
              onChangeText={(v) => handleChange('telefono', v)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="juan@email.com"
              value={formData.email}
              onChangeText={(v) => handleChange('email', v)}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Edad y Fecha de Nacimiento */}
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Edad</Text>
            <TextInput
              style={styles.input}
              placeholder="30"
              value={formData.edad}
              onChangeText={(v) => handleChange('edad', v)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha Nacimiento</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              value={formData.fechaNacimiento}
              onChangeText={(v) => handleChange('fechaNacimiento', v)}
            />
          </View>
        </View>

        {/* Rubro y Años de Experiencia */}
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rubro *</Text>
            <TextInput
              style={styles.input}
              placeholder="Cocina, Bar, Servicio..."
              value={formData.rubro}
              onChangeText={(v) => handleChange('rubro', v)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Años de Experiencia</Text>
            <TextInput
              style={styles.input}
              placeholder="5"
              value={formData.experiencia}
              onChangeText={(v) => handleChange('experiencia', v)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Faltas y Asistencias */}
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>N° de Faltas</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={formData.faltas}
              onChangeText={(v) => handleChange('faltas', v)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>N° de Asistencias</Text>
            <TextInput
              style={styles.input}
              placeholder="120"
              value={formData.asistencias}
              onChangeText={(v) => handleChange('asistencias', v)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Francos Establecidos */}
        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Francos Establecidos</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ej: Lunes y Martes"
            value={formData.francos}
            onChangeText={(v) => handleChange('francos', v)}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Botón de Guardar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>Agregar Empleado</ThemedText>
        </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputGroupFull: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
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
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#0d9488',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});