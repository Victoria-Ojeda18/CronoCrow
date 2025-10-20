// app/dashboard/empledo/_layout.tsx
import { Tabs } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

export default function EmployeeTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 👈 Esto es clave
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
        name="time-off"
        options={{
          title: 'Solicitudes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="calendar-days" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ausentes"
        options={{
          title: 'Ausentes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="xmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diasLibres"
        options={{
          title: 'Días Libres',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="sun" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}