// app/(employer)/_layout.tsx
import { Tabs } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { FontAwesome6 } from '@expo/vector-icons';



export default function EmployerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0d9488',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 4,
          paddingTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="page"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="presentes"
        options={{
          title: 'Presentes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="check" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ausentes"
        options={{
          title: 'Ausentes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="x" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diasLibres"
        options={{
          title: 'Días Libres',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="calendar-days" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="listaDeEmpleados"
        options={{
          title: 'Empleados',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="users" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="agregarEmpleado"
        options={{
          title: 'Agregar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="plus" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}