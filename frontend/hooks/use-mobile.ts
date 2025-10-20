import { useEffect, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para verificar si es móvil basado en el ancho de la ventana
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px es el breakpoint md de Tailwind
    }

    // Verificar inicialmente
    checkIsMobile()

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener('resize', checkIsMobile)

    // Limpiar listener
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}