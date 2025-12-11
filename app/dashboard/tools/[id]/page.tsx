"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import styles from "../../dashboard.module.css"

interface ToolDetail {
  id: string
  name: string
  icon: string
  description: string
  difficulty: string
  category: string
  usos: string[]
  escenarios: string[]
  comandos: { titulo: string; comando: string; descripcion: string }[]
}

const toolDetails: { [key: string]: ToolDetail } = {
  nmap: {
    id: "nmap",
    name: "Nmap",
    icon: "🔍",
    description: "Explorador de red y auditor de seguridad",
    difficulty: "Intermedio",
    category: "Reconocimiento",
    usos: [
      "Descubrimiento de hosts activos en una red",
      "Mapeo de puertos abiertos y servicios",
      "Detección de sistemas operativos",
      "Identificación de filtros de firewall",
      "Enumeración de servicios y versiones",
    ],
    escenarios: [
      "Evaluación inicial de seguridad de infraestructura",
      "Preparación para pruebas de penetración",
      "Inventario de dispositivos en una red corporativa",
      "Detección de cambios no autorizados en la red",
      "Análisis de topología de red",
    ],
    comandos: [
      {
        titulo: "Escaneo básico de puertos",
        comando: "nmap 192.168.1.1",
        descripcion: "Realiza un escaneo TCP de los 1000 puertos más comunes",
      },
      {
        titulo: "Escaneo de todos los puertos",
        comando: "nmap -p- 192.168.1.1",
        descripcion: "Escanea todos los 65535 puertos TCP",
      },
      {
        titulo: "Escaneo con detección de versión",
        comando: "nmap -sV 192.168.1.1",
        descripcion: "Detecta versiones de servicios en puertos abiertos",
      },
      {
        titulo: "Escaneo de detección OS",
        comando: "nmap -O 192.168.1.1",
        descripcion: "Intenta detectar el sistema operativo del objetivo",
      },
      {
        titulo: "Escaneo UDP",
        comando: "nmap -sU 192.168.1.1",
        descripcion: "Realiza escaneo de puertos UDP",
      },
      {
        titulo: "Escaneo con scripts NSE",
        comando: "nmap -sC 192.168.1.1",
        descripcion: "Ejecuta scripts NSE por defecto para más información",
      },
      {
        titulo: "Escaneo sigiloso (half-open)",
        comando: "nmap -sS 192.168.1.1",
        descripcion: "SYN scan - más sigiloso que escaneo TCP completo",
      },
      {
        titulo: "Escaneo de rango de IPs",
        comando: "nmap 192.168.1.0/24",
        descripcion: "Escanea todas las IPs en la subred /24",
      },
    ],
  },
  nikto: {
    id: "nikto",
    name: "Nikto",
    icon: "🕷️",
    description: "Escáner de vulnerabilidades web",
    difficulty: "Principiante",
    category: "Análisis Web",
    usos: [
      "Detección de ficheros y directorios sensibles",
      "Identificación de servidores web desactualizados",
      "Búsqueda de problemas de configuración",
      "Detección de vulnerabilidades conocidas",
      "Auditoría de servidores web",
    ],
    escenarios: [
      "Testing inicial de aplicaciones web",
      "Auditoría de servidores web públicos",
      "Verificación de configuración de seguridad",
      "Detección de archivos de respaldo no eliminados",
      "Búsqueda de directorio admin o información sensible",
    ],
    comandos: [
      {
        titulo: "Escaneo básico de un servidor web",
        comando: "nikto -h 192.168.1.100",
        descripcion: "Realiza un escaneo completo del servidor web en la IP especificada",
      },
      {
        titulo: "Escaneo de un sitio HTTPS",
        comando: "nikto -h https://example.com",
        descripcion: "Escanea un sitio HTTPS usando el protocolo seguro",
      },
      {
        titulo: "Escaneo en puerto específico",
        comando: "nikto -h 192.168.1.100 -p 8080",
        descripcion: "Escanea un servidor web en un puerto no estándar",
      },
      {
        titulo: "Guardar resultado en archivo HTML",
        comando: "nikto -h 192.168.1.100 -o report.html -Format html",
        descripcion: "Exporta el reporte en formato HTML para análisis posterior",
      },
      {
        titulo: "Escaneo ignorando ciertos códigos HTTP",
        comando: "nikto -h 192.168.1.100 -Tuning x",
        descripcion: "Salta ciertos tipos de verificaciones para acelerar el escaneo",
      },
      {
        titulo: "Especificar un User-Agent personalizado",
        comando: "nikto -h 192.168.1.100 -useragent 'Mozilla/5.0'",
        descripcion: "Usa un User-Agent personalizado para evitar detección",
      },
      {
        titulo: "Escaneo agresivo",
        comando: "nikto -h 192.168.1.100 -Tuning 9",
        descripcion: "Realiza un escaneo más agresivo y exhaustivo",
      },
      {
        titulo: "Escaneo en modo verbose",
        comando: "nikto -h 192.168.1.100 -v",
        descripcion: "Muestra información detallada durante el escaneo",
      },
    ],
  },
  "burp-suite": {
    id: "burp-suite",
    name: "Burp Suite",
    icon: "🔐",
    description: "Suite completa de testing de seguridad web",
    difficulty: "Avanzado",
    category: "Análisis Web",
    usos: [
      "Análisis de peticiones HTTP/HTTPS",
      "Testing de inyección SQL y XSS",
      "Análisis de autenticación y sesiones",
      "Scanning de vulnerabilidades automatizado",
      "Fuzzing de parámetros",
      "Análisis de respuestas del servidor",
    ],
    escenarios: [
      "Pentesting profesional de aplicaciones web",
      "Análisis detallado de flujos de autenticación",
      "Búsqueda de vulnerabilidades lógicas",
      "Testing de APIs REST/SOAP",
      "Verificación de implementación de CSRF tokens",
    ],
    comandos: [
      {
        titulo: "Iniciar Burp Suite Community",
        comando: "burpsuite",
        descripcion: "Inicia la GUI de Burp Suite (requiere X11 en Linux remoto)",
      },
      {
        titulo: "Iniciar con archivo de proyecto",
        comando: "burpsuite --config-file=configuracion.burp",
        descripcion: "Carga una configuración guardada previamente",
      },
      {
        titulo: "Configurar proxy local",
        comando: "export http_proxy=http://127.0.0.1:8080",
        descripcion: "Configura el proxy en variables de entorno para capturar tráfico",
      },
      {
        titulo: "Usar Burp Repeater para modificar peticiones",
        comando: "Menú: Tools > Repeater",
        descripcion: "Permite modificar y reenviar peticiones HTTP manualmente",
      },
      {
        titulo: "Usar Burp Scanner para auditoría automática",
        comando: "Menú: Tools > Scanner > New Scan",
        descripcion: "Inicia un escaneo automatizado de vulnerabilidades",
      },
      {
        titulo: "Usar Burp Intruder para fuzzing",
        comando: "Menú: Tools > Intruder > Send to Intruder",
        descripcion: "Automatiza ataques parametrizados contra endpoints",
      },
      {
        titulo: "Interceptar solicitud en el Proxy",
        comando: "Menú: Proxy > Intercept > Intercept is on",
        descripcion: "Captura solicitudes HTTP antes de que sean enviadas",
      },
      {
        titulo: "Analizar contenido de respuesta",
        comando: "Pestaña: Response > Render/HTML/Text",
        descripcion: "Visualiza respuestas en diferentes formatos para análisis",
      },
    ],
  },
  metasploit: {
    id: "metasploit",
    name: "Metasploit Framework",
    icon: "⚔️",
    description: "Framework para desarrollo y ejecución de exploits",
    difficulty: "Avanzado",
    category: "Explotación",
    usos: [
      "Desarrollo y prueba de exploits",
      "Ejecución de payloads en sistemas comprometidos",
      "Enumeración post-explotación",
      "Generación de shellcode",
      "Testing de evasión de antivirus",
      "Automatización de pruebas de penetración",
    ],
    escenarios: [
      "Prueba de exploits conocidos en infraestructura",
      "Desarrollo de exploits personalizados",
      "Simulación de campañas de APT",
      "Testing de capacidades de detección",
      "Validación de parches de seguridad",
    ],
    comandos: [
      {
        titulo: "Iniciar msfconsole",
        comando: "msfconsole",
        descripcion: "Inicia la consola interactiva de Metasploit",
      },
      {
        titulo: "Buscar un exploit específico",
        comando: "search ms17-010",
        descripcion: "Busca exploits relacionados con la vulnerabilidad MS17-010",
      },
      {
        titulo: "Usar un exploit",
        comando: "use exploit/windows/smb/ms17_010_eternalblue",
        descripcion: "Selecciona un exploit específico para trabajar con él",
      },
      {
        titulo: "Ver opciones del exploit",
        comando: "show options",
        descripcion: "Muestra los parámetros configurables del exploit actual",
      },
      {
        titulo: "Establecer variable RHOST",
        comando: "set RHOST 192.168.1.100",
        descripcion: "Configura el host remoto objetivo",
      },
      {
        titulo: "Establecer payload",
        comando: "set PAYLOAD windows/meterpreter/reverse_tcp",
        descripcion: "Selecciona el payload que se ejecutará tras el exploit",
      },
      {
        titulo: "Verificar configuración",
        comando: "check",
        descripcion: "Verifica si el objetivo es vulnerable antes de explotar",
      },
      {
        titulo: "Ejecutar exploit",
        comando: "run",
        descripcion: "Ejecuta el exploit con la configuración especificada",
      },
    ],
  },
  wireshark: {
    id: "wireshark",
    name: "Wireshark",
    icon: "📡",
    description: "Analizador de protocolos de red",
    difficulty: "Intermedio",
    category: "Análisis de Tráfico",
    usos: [
      "Captura de paquetes de red",
      "Análisis de protocolos de comunicación",
      "Debugging de problemas de conectividad",
      "Detección de tráfico malicioso",
      "Análisis de seguridad de red",
      "Investigación de incidentes",
    ],
    escenarios: [
      "Análisis forense de tráfico de red",
      "Detección de exfiltración de datos",
      "Debugging de aplicaciones de red",
      "Análisis de credenciales transmitidas sin cifrar",
      "Investigación de anomalías de red",
    ],
    comandos: [
      {
        titulo: "Iniciar Wireshark con GUI",
        comando: "wireshark",
        descripcion: "Inicia la interfaz gráfica de Wireshark",
      },
      {
        titulo: "Capturar en interfaz específica",
        comando: "wireshark -i eth0",
        descripcion: "Captura tráfico solo de la interfaz de red eth0",
      },
      {
        titulo: "Listar interfaces disponibles",
        comando: "tshark -D",
        descripcion: "Lista todas las interfaces de red disponibles para captura",
      },
      {
        titulo: "Captura con tshark a archivo",
        comando: "tshark -i eth0 -w captura.pcap",
        descripcion: "Captura tráfico usando tshark y lo guarda en archivo PCAP",
      },
      {
        titulo: "Leer archivo PCAP",
        comando: "tshark -r captura.pcap",
        descripcion: "Lee y muestra contenido de un archivo de captura previo",
      },
      {
        titulo: "Filtrar por protocolo",
        comando: "Filtro: tcp.port == 80",
        descripcion: "Muestra solo tráfico TCP en puerto 80 (HTTP)",
      },
      {
        titulo: "Filtrar por dirección IP",
        comando: "Filtro: ip.src == 192.168.1.100",
        descripcion: "Muestra solo paquetes originados desde una IP específica",
      },
      {
        titulo: "Filtrar por protocolo HTTP",
        comando: "Filtro: http",
        descripcion: "Muestra solo paquetes HTTP (requiere que no esté cifrado)",
      },
    ],
  },
  hashcat: {
    id: "hashcat",
    name: "Hashcat",
    icon: "🔓",
    description: "Herramienta de recuperación de contraseñas",
    difficulty: "Intermedio",
    category: "Crack de Contraseñas",
    usos: [
      "Cracking de contraseñas con ataques de diccionario",
      "Ataques de fuerza bruta",
      "Ataques de máscara",
      "Cracking de hashes de múltiples tipos",
      "Testing de fortaleza de contraseñas",
      "Recuperación de credenciales",
    ],
    escenarios: [
      "Validación de políticas de contraseñas",
      "Recovery de contraseñas olvidadas",
      "Análisis de hashes obtenidos en auditoría",
      "Testing de implementación de password hashing",
      "Evaluación de entropía de contraseñas",
    ],
    comandos: [
      {
        titulo: "Ataque de diccionario contra MD5",
        comando: "hashcat -m 0 -a 0 hash.txt diccionario.txt",
        descripcion: "Intenta crackear hash MD5 usando diccionario",
      },
      {
        titulo: "Listar modos de hash soportados",
        comando: "hashcat --help | grep -A 50 'Hash modes'",
        descripcion: "Muestra todos los tipos de hash que hashcat puede procesar",
      },
      {
        titulo: "Ataque de fuerza bruta",
        comando: "hashcat -m 0 -a 3 hash.txt ?a?a?a?a?a?a?a?a",
        descripcion: "Intenta todas las combinaciones de 8 caracteres (muy lento)",
      },
      {
        titulo: "Ataque de máscara",
        comando: "hashcat -m 0 -a 3 hash.txt Pass?d?d?d?d",
        descripcion: "Intenta contraseñas tipo 'Pass' + 4 dígitos",
      },
      {
        titulo: "Usar múltiples diccionarios",
        comando: "cat dict1.txt dict2.txt > combined.txt && hashcat -m 0 -a 0 hash.txt combined.txt",
        descripcion: "Combina varios diccionarios para ataque más efectivo",
      },
      {
        titulo: "Cracking de SHA1",
        comando: "hashcat -m 100 -a 0 hash.txt diccionario.txt",
        descripcion: "Intenta crackear hash SHA1 con diccionario",
      },
      {
        titulo: "Cracking de bcrypt",
        comando: "hashcat -m 3200 -a 0 hash.txt diccionario.txt",
        descripcion: "Intenta crackear hash bcrypt (más lento pero más seguro)",
      },
      {
        titulo: "Mostrar hashes crackeados",
        comando: "hashcat -m 0 -a 0 hash.txt diccionario.txt --show",
        descripcion: "Muestra los hashes que ya fueron crackeados exitosamente",
      },
    ],
  },
  sqlmap: {
    id: "sqlmap",
    name: "SQLMap",
    icon: "💾",
    description: "Herramienta de automación de inyección SQL",
    difficulty: "Intermedio",
    category: "Análisis Web",
    usos: [
      "Detección automática de SQL injection",
      "Extracción de datos de bases de datos",
      "Bypass de autenticación",
      "Escalada de privilegios en BD",
      "Ejecución de comandos del SO",
      "Mapping de estructura de BD",
    ],
    escenarios: [
      "Testing de vulnerabilidades SQL en aplicaciones web",
      "Recuperación de datos sensibles de BD",
      "Validación de parches de SQL injection",
      "Análisis de mecanismos de defensa",
      "Auditoría de aplicaciones legadas",
    ],
    comandos: [
      {
        titulo: "Detectar SQL injection en parámetro GET",
        comando: "sqlmap -u 'http://target.com/page.php?id=1' --dbs",
        descripcion: "Intenta detectar y listar bases de datos del servidor",
      },
      {
        titulo: "Especificar parámetro vulnerable",
        comando: "sqlmap -u 'http://target.com/page.php?id=1&user=admin' -p id --dbs",
        descripcion: "Enfoca el ataque solo en el parámetro 'id'",
      },
      {
        titulo: "Extraer tablas de una BD",
        comando: "sqlmap -u 'http://target.com/page.php?id=1' -D nombre_bd --tables",
        descripcion: "Lista todas las tablas de una base de datos específica",
      },
      {
        titulo: "Extraer columnas de una tabla",
        comando: "sqlmap -u 'http://target.com/page.php?id=1' -D nombre_bd -T tabla --columns",
        descripcion: "Muestra las columnas de una tabla específica",
      },
      {
        titulo: "Dumpear tabla completa",
        comando: "sqlmap -u 'http://target.com/page.php?id=1' -D nombre_bd -T tabla --dump",
        descripcion: "Extrae todos los datos de una tabla",
      },
      {
        titulo: "POST request con SQLMap",
        comando: "sqlmap -u 'http://target.com/login.php' --data='user=admin&pass=1' -p pass --dbs",
        descripcion: "Analiza inyección SQL en parámetros POST",
      },
      {
        titulo: "Usar archivo de solicitud",
        comando: "sqlmap -r request.txt --dbs",
        descripcion: "Lee solicitud HTTP desde archivo guardado (útil con Burp)",
      },
      {
        titulo: "Modo agresivo",
        comando: "sqlmap -u 'http://target.com/page.php?id=1' --level=5 --risk=3 --dbs",
        descripcion: "Usa todas las técnicas y payloads (más lento pero más completo)",
      },
    ],
  },
  aircrack: {
    id: "aircrack",
    name: "Aircrack-ng",
    icon: "📶",
    description: "Suite para auditoría de redes WiFi",
    difficulty: "Avanzado",
    category: "WiFi",
    usos: [
      "Captura de tráfico WiFi",
      "Cracking de contraseñas WEP/WPA",
      "Deautenticación forzada de clientes",
      "Inyección de paquetes",
      "Análisis de redes inalámbricas",
      "Testing de fortaleza de contraseñas WiFi",
    ],
    escenarios: [
      "Auditoría de seguridad WiFi corporativa",
      "Testing de políticas de contraseña WiFi",
      "Investigación de redes no autorizadas",
      "Validación de implementación de WPA2/WPA3",
      "Recuperación de credenciales WiFi",
    ],
    comandos: [
      {
        titulo: "Poner interfaz en modo monitor",
        comando: "sudo airmon-ng start wlan0",
        descripcion: "Cambia tarjeta de red a modo monitor para capturar todo",
      },
      {
        titulo: "Escanear redes WiFi cercanas",
        comando: "sudo airodump-ng wlan0mon",
        descripcion: "Lista todas las redes WiFi, BSSID, canal y clientes conectados",
      },
      {
        titulo: "Capturar handshake WPA",
        comando: "sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w captura wlan0mon",
        descripcion: "Captura en un archivo el handshake de autenticación WPA",
      },
      {
        titulo: "Deautenticar cliente WiFi",
        comando: "sudo aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF -c XX:XX:XX:XX:XX:XX wlan0mon",
        descripcion: "Desconecta cliente específico para forzar reconexión",
      },
      {
        titulo: "Crackear WPA con diccionario",
        comando: "sudo aircrack-ng -w diccionario.txt -b AA:BB:CC:DD:EE:FF captura.cap",
        descripcion: "Intenta crackear contraseña WPA usando diccionario",
      },
      {
        titulo: "Crackear WEP",
        comando: "sudo aircrack-ng -w diccionario.txt captura.cap",
        descripcion: "Intenta crackear contraseña WEP (menos seguro, más rápido)",
      },
      {
        titulo: "Inyectar paquetes para acelerar",
        comando: "sudo aireplay-ng -3 -b AA:BB:CC:DD:EE:FF wlan0mon",
        descripcion: "Inyecta paquetes para generar más IVs (acelera cracking WEP)",
      },
      {
        titulo: "Salir del modo monitor",
        comando: "sudo airmon-ng stop wlan0mon",
        descripcion: "Restaura la interfaz de red a modo normal",
      },
    ],
  },
  hydra: {
    id: "hydra",
    name: "Hydra",
    icon: "💧",
    description: "Herramienta de ataque de fuerza bruta paralela",
    difficulty: "Intermedio",
    category: "Crack de Contraseñas",
    usos: [
      "Ataque de fuerza bruta contra SSH",
      "Cracking de credenciales HTTP/FTP",
      "Testing de contraseñas contra múltiples servicios",
      "Ataque paralelo de múltiples usuarios",
      "Validación de políticas de contraseña",
    ],
    escenarios: [
      "Testing de fortaleza de contraseña en producción",
      "Recuperación de credenciales olvidadas",
      "Validación de implementación de bloqueo de intentos",
      "Auditoría de servicios de red accesibles",
      "Simulación de ataque de credenciales comprometidas",
    ],
    comandos: [
      {
        titulo: "Ataque SSH básico",
        comando: "hydra -l admin -p password 192.168.1.1 ssh",
        descripcion: "Intenta conectar SSH con usuario y contraseña específicas",
      },
      {
        titulo: "SSH con diccionario",
        comando: "hydra -l admin -P diccionario.txt 192.168.1.1 ssh",
        descripcion: "Intenta múltiples contraseñas desde un diccionario",
      },
      {
        titulo: "SSH con múltiples usuarios",
        comando: "hydra -L usuarios.txt -P passwords.txt 192.168.1.1 ssh",
        descripcion: "Prueba combinaciones de usuarios y contraseñas",
      },
      {
        titulo: "FTP con 4 threads paralelos",
        comando: "hydra -l admin -P passwords.txt -t 4 192.168.1.1 ftp",
        descripcion: "Acelera el ataque usando 4 conexiones paralelas",
      },
      {
        titulo: "HTTP Basic Auth",
        comando: "hydra -l admin -P passwords.txt 192.168.1.1 http-get /admin",
        descripcion: "Ataca autenticación básica HTTP en ruta específica",
      },
      {
        titulo: "HTTP POST form",
        comando: "hydra -l admin -P passwords.txt -U 192.168.1.1 http-post-form '/login.php:user=^USER^&pass=^PASS^:Invalid'",
        descripcion: "Ataca formularios POST personalizados",
      },
      {
        titulo: "Telnet con timeout personalizado",
        comando: "hydra -l admin -P passwords.txt -w 10 192.168.1.1 telnet",
        descripcion: "Aumenta timeout a 10 segundos para conexiones lentas",
      },
      {
        titulo: "Mostrar resultados encontrados",
        comando: "hydra -l admin -P passwords.txt -o results.txt 192.168.1.1 ssh",
        descripcion: "Guarda credenciales exitosas en archivo results.txt",
      },
    ],
  },
  gobuster: {
    id: "gobuster",
    name: "Gobuster",
    icon: "👻",
    description: "Herramienta de fuerza bruta para directorios y dominios",
    difficulty: "Principiante",
    category: "Reconocimiento",
    usos: [
      "Descubrimiento de directorios ocultos en webs",
      "Enumeración de archivos y rutas",
      "Fuzzing de parámetros y endpoints",
      "Fuerza bruta de nombres de dominio",
      "Identificación de buckets S3 y objetos",
    ],
    escenarios: [
      "Fase de reconocimiento en pentesting web",
      "Búsqueda de directorios admin o sensibles",
      "Descubrimiento de APIs no documentadas",
      "Identificación de configuraciones por defecto",
      "Enumeración de directorios en servidores legados",
    ],
    comandos: [
      {
        titulo: "Fuerza bruta básica de directorios",
        comando: "gobuster dir -u http://target.com -w wordlist.txt",
        descripcion: "Prueba palabras comunes buscando directorios válidos",
      },
      {
        titulo: "Especificar extensiones de archivo",
        comando: "gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt",
        descripcion: "Solo busca archivos con extensiones específicas",
      },
      {
        titulo: "Ignorar códigos de estado",
        comando: "gobuster dir -u http://target.com -w wordlist.txt -b 404,403",
        descripcion: "Oculta resultados con códigos 404 y 403",
      },
      {
        titulo: "Fuerza bruta de subdominios",
        comando: "gobuster dns -d target.com -w wordlist.txt",
        descripcion: "Descubre subdominios válidos",
      },
      {
        titulo: "Threads paralelos para velocidad",
        comando: "gobuster dir -u http://target.com -w wordlist.txt -t 50",
        descripcion: "Usa 50 threads para paralelizar búsqueda",
      },
      {
        titulo: "Mostrar solo respuestas exitosas",
        comando: "gobuster dir -u http://target.com -w wordlist.txt -z",
        descripcion: "Oculta banner y solo muestra directorios encontrados",
      },
      {
        titulo: "Reporte en archivo",
        comando: "gobuster dir -u http://target.com -w wordlist.txt -o report.txt",
        descripcion: "Guarda resultados en archivo de reporte",
      },
      {
        titulo: "Búsqueda VHost",
        comando: "gobuster vhost -u http://target.com -w wordlist.txt",
        descripcion: "Descubre virtual hosts en mismo servidor",
      },
    ],
  },
}

export default function ToolDetailPage() {
  const params = useParams()
  const toolId = params.id as string
  const tool = toolDetails[toolId]
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session", { credentials: "include" })
      if (res.ok) {
        setSession(await res.json())
      } else {
        window.location.href = "/auth/login"
      }
      setLoading(false)
    }
    fetchSession()
  }, [])

  const handleCopyCommand = (comando: string, idx: number) => {
    navigator.clipboard.writeText(comando)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  if (loading) return <div className={styles.container}>Cargando...</div>
  if (!session) return null
  if (!tool)
    return (
      <div className={styles.container}>
        <Link href="/dashboard/tools" className="btn btn-secondary">
          ← Herramientas
        </Link>
        <h1>Herramienta no encontrada</h1>
      </div>
    )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userSection}>
          <h1 style={{ display: "flex", alignItems: "center", gap: "12px", margin: 0 }}>
            <span>{tool.icon}</span> {tool.name}
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>{tool.description}</p>
        </div>
        <Link href="/dashboard/tools" className="btn btn-secondary">
          ← Atrás
        </Link>
      </div>

      {/* Info badges */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        <span
          style={{
            padding: "6px 12px",
            backgroundColor: "var(--primary)",
            borderRadius: "var(--radius-sm)",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {tool.category}
        </span>
        <span
          style={{
            padding: "6px 12px",
            backgroundColor:
              tool.difficulty === "Principiante"
                ? "#64c864"
                : tool.difficulty === "Intermedio"
                  ? "#ffb84d"
                  : "#ff6b6b",
            borderRadius: "var(--radius-sm)",
            fontSize: "12px",
            fontWeight: "500",
            color: tool.difficulty === "Intermedio" ? "#000" : "white",
          }}
        >
          {tool.difficulty}
        </span>
      </div>

      {/* Usos Comunes */}
      <section
        style={{
          marginBottom: "32px",
          padding: "16px",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Usos Comunes</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tool.usos.map((uso, idx) => (
            <li key={idx} style={{ marginBottom: "8px", paddingLeft: "24px", position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "var(--primary)" }}>✓</span>
              {uso}
            </li>
          ))}
        </ul>
      </section>

      {/* Escenarios Reales */}
      <section
        style={{
          marginBottom: "32px",
          padding: "16px",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Escenarios Reales</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tool.escenarios.map((escenario, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: "8px",
                paddingLeft: "24px",
                position: "relative",
                color: "var(--text-secondary)",
              }}
            >
              <span style={{ position: "absolute", left: 0, color: "var(--primary)" }}>→</span>
              {escenario}
            </li>
          ))}
        </ul>
      </section>

      {/* Comandos */}
      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Comandos Más Utilizados</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "16px" }}>
          {tool.comandos.map((cmd, idx) => (
            <div
              key={idx}
              style={{
                padding: "12px",
                backgroundColor: "var(--bg-tertiary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
              }}
            >
              <h4 style={{ fontSize: "14px", marginBottom: "6px", color: "var(--primary)" }}>{cmd.titulo}</h4>
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <code
                  style={{
                    flex: 1,
                    display: "block",
                    padding: "8px",
                    backgroundColor: "#000",
                    color: "#00ff00",
                    borderRadius: "4px",
                    fontSize: "11px",
                    overflow: "auto",
                    marginBottom: "6px",
                    fontFamily: "Courier New, monospace",
                  }}
                >
                  {cmd.comando}
                </code>
                <button
                  onClick={() => handleCopyCommand(cmd.comando, idx)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: copiedIdx === idx ? "#64c864" : "var(--primary)",
                    color: copiedIdx === idx ? "#000" : "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    minWidth: "60px",
                    marginTop: "0px",
                  }}
                  title="Copiar comando"
                >
                  {copiedIdx === idx ? "✓ Copiado" : "📋 Copiar"}
                </button>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>{cmd.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", paddingBottom: "24px" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
          Recuerda: Usa estas herramientas solo en sistemas donde tengas autorización.
        </p>
      </div>
    </div>
  )
}
