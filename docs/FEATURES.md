# Red Team Tools - Documentación de Actualización

## Validaciones Frontend Implementadas

### Login
- **Email**: 
  - Debe contener `@`
  - Debe tener un dominio válido (`.com`, `.es`, etc.)
  - La parte anterior a `@` debe tener mínimo 3 caracteres
  - Muestra indicador visual verde cuando es válido ✓
  
- **Contraseña**:
  - Mínimo 6 caracteres
  - Muestra indicador visual cuando es válida ✓
  - El botón de inicio de sesión se desactiva hasta que ambos campos sean válidos

### Registro
- **Email**: Mismas validaciones que login
- **Contraseña**:
  - Mínimo 6 caracteres
  - Debe contener al menos una MAYÚSCULA
  - Debe contener al menos un NÚMERO
  - Muestra indicador visual cuando es válida ✓
  
- **Confirmar Contraseña**:
  - Debe coincidir exactamente con la contraseña
  - Muestra error inmediato si no coinciden
  - Muestra indicador visual cuando coinciden ✓
  
- **Comportamiento**:
  - El botón "Crear Cuenta" está deshabilitado hasta que todos los campos sean válidos
  - Validaciones en tiempo real mientras escribes
  - Mensajes de error específicos debajo de cada campo

## Herramientas de Red Team Implementadas

Se han agregado 8 herramientas profesionales usadas en pentesting y auditoría de seguridad:

### 1. **Nmap** 🔍
- **Categoría**: Reconocimiento
- **Dificultad**: Intermedio
- **Descripción**: Explorador de red y auditor de seguridad
- **Usos**: Descubrimiento de hosts, mapeo de puertos, detección de SO, enumeración de servicios
- **Comandos**: 8 ejemplos incluyendo escaneos básicos, UDP, SYN, detección de SO, etc.

### 2. **Nikto** 🕷️
- **Categoría**: Análisis Web
- **Dificultad**: Principiante
- **Descripción**: Escáner de vulnerabilidades web
- **Usos**: Detección de ficheros sensibles, servidores desactualizados, problemas de configuración
- **Comandos**: 8 ejemplos incluyendo HTTPS, puertos personalizados, reportes HTML, etc.

### 3. **Burp Suite** 🔐
- **Categoría**: Análisis Web
- **Dificultad**: Avanzado
- **Descripción**: Suite completa de testing de seguridad web
- **Usos**: Análisis HTTP/HTTPS, testing de inyecciones, análisis de autenticación, fuzzing
- **Comandos**: 8 ejemplos de uso del Proxy, Repeater, Scanner, Intruder

### 4. **Metasploit Framework** ⚔️
- **Categoría**: Explotación
- **Dificultad**: Avanzado
- **Descripción**: Framework para desarrollo y ejecución de exploits
- **Usos**: Desarrollo de exploits, ejecución de payloads, enumeración post-explotación
- **Comandos**: 8 ejemplos incluyendo búsqueda de exploits, configuración, ejecución

### 5. **Wireshark** 📡
- **Categoría**: Análisis de Tráfico
- **Dificultad**: Intermedio
- **Descripción**: Analizador de protocolos de red
- **Usos**: Captura de paquetes, análisis de protocolos, debugging, detección de malware
- **Comandos**: 8 ejemplos incluyendo captura, filtros, análisis de archivos PCAP

### 6. **Hashcat** 🔓
- **Categoría**: Crack de Contraseñas
- **Dificultad**: Intermedio
- **Descripción**: Herramienta de recuperación de contraseñas
- **Usos**: Cracking con diccionario, fuerza bruta, ataques de máscara, múltiples tipos de hash
- **Comandos**: 8 ejemplos incluyendo MD5, SHA1, bcrypt, ataques de máscara

### 7. **SQLMap** 💾
- **Categoría**: Análisis Web
- **Dificultad**: Intermedio
- **Descripción**: Herramienta de automación de inyección SQL
- **Usos**: Detección de SQL injection, extracción de datos, bypass de autenticación
- **Comandos**: 8 ejemplos incluyendo GET, POST, extracción de tablas, modo agresivo

### 8. **Aircrack-ng** 📶
- **Categoría**: WiFi
- **Dificultad**: Avanzado
- **Descripción**: Suite para auditoría de redes WiFi
- **Usos**: Captura de tráfico WiFi, cracking WEP/WPA, deautenticación, inyección de paquetes
- **Comandos**: 8 ejemplos incluyendo modo monitor, captura de handshake, cracking

## Estructura de Herramientas

### Página de Listado (`/dashboard/tools`)
- Grilla de herramientas con icono, nombre, descripción
- **Filtrado por categorías**: Todas, Reconocimiento, Análisis Web, Explotación, Análisis de Tráfico, Crack de Contraseñas, WiFi
- **Badge de dificultad**: Verde (Principiante), Naranja (Intermedio), Rojo (Avanzado)
- Links clicables a detalles de cada herramienta

### Página de Detalles (`/dashboard/tools/[id]`)
Para cada herramienta incluye:

1. **Información Base**
   - Icono y nombre
   - Descripción
   - Categoría y nivel de dificultad

2. **Usos Comunes**
   - Lista de 5-6 usos principales
   - Formato con checkmark visual (✓)

3. **Escenarios Reales**
   - Casos de uso prácticos en auditorías
   - Contextos donde se utiliza la herramienta
   - Formato con flecha visual (→)

4. **Comandos Más Utilizados**
   - 8 comandos/ejemplos por herramienta
   - Cada comando incluye:
     - Título descriptivo
     - Comando en código (fondo oscuro con sintaxis verde terminal)
     - Explicación de qué hace
   - Grid responsive que se adapta al tamaño de pantalla

## Características de Seguridad

- ✅ Protección de sesión: Solo usuarios autenticados pueden acceder a herramientas
- ✅ Validaciones en tiempo real: Feedback inmediato al usuario
- ✅ Campos deshabilitados durante envío: Previene múltiples sumisiones
- ✅ Indicadores visuales: Usuarios saben exactamente qué está mal
- ✅ Sin errores en consola: Validaciones limpias y sin estado inválido

## Mejoras en UX

- Colores visuales para errores (rojo) y éxito (verde)
- El botón de envío solo se activa cuando todo es válido
- Mensajes específicos para cada tipo de error
- Indicadores de validación correcta con ✓ en verde
- Inputs con border rojo cuando hay error
- Tooltips con información sobre requisitos de contraseña
- Filtros interactivos en página de herramientas
- Layout responsive para dispositivos móviles

## Próximas Mejoras Sugeridas

- [ ] Agregar más herramientas (nessus, impacket, hashcheck, etc.)
- [ ] Sistema de favoritos para herramientas
- [ ] Historial de herramientas consultadas
- [ ] Búsqueda por nombre/descripción
- [ ] Sistema de rating/comentarios
- [ ] Copiar comandos al clipboard con un click
- [ ] Dark/Light mode toggle
- [ ] Integración con API de CVEs
- [ ] Generador de comandos con GUI interactiva
