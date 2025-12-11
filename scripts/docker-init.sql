-- Docker PostgreSQL initialization script
-- This runs automatically when the container starts

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  date_of_birth DATE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  scenario TEXT NOT NULL,
  risks_advantages TEXT,
  category VARCHAR(50) NOT NULL DEFAULT 'general',
  official_url VARCHAR(500),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Commands table
CREATE TABLE IF NOT EXISTS commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  command TEXT NOT NULL,
  description TEXT NOT NULL,
  example TEXT,
  flags_params TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_name ON tools(name);
CREATE INDEX IF NOT EXISTS idx_commands_tool_id ON commands(tool_id);

-- Insert default tools
INSERT INTO tools (id, name, description, scenario, risks_advantages, category, official_url, created_by) VALUES
('11111111-1111-1111-1111-111111111111', 'Nmap', 'Network Mapper - Herramienta de código abierto para exploración de redes y auditoría de seguridad.', 'Se utiliza en la fase de reconocimiento de un pentest para descubrir hosts activos, puertos abiertos, servicios ejecutándose y versiones de software.', 'Ventajas: Extremadamente versátil, scripts NSE extensibles. Riesgos: Escaneos agresivos pueden ser detectados por IDS/IPS.', 'reconnaissance', 'https://nmap.org', NULL),
('22222222-2222-2222-2222-222222222222', 'Nikto', 'Escáner de vulnerabilidades web que examina servidores web en busca de archivos peligrosos y configuraciones inseguras.', 'Se usa para identificar vulnerabilidades conocidas en servidores web, configuraciones inseguras y scripts peligrosos.', 'Ventajas: Base de datos extensa de vulnerabilidades. Riesgos: Genera mucho ruido en logs, fácilmente detectable.', 'web', 'https://cirt.net/Nikto2', NULL),
('33333333-3333-3333-3333-333333333333', 'Burp Suite', 'Plataforma integrada para pruebas de seguridad de aplicaciones web.', 'Esencial para pruebas manuales y automatizadas de aplicaciones web. Se usa para interceptar tráfico HTTP/S y modificar requests.', 'Ventajas: Suite completa, extensible con plugins. Riesgos: La versión Pro es costosa.', 'web', 'https://portswigger.net/burp', NULL),
('44444444-4444-4444-4444-444444444444', 'Metasploit', 'Framework de penetration testing más utilizado. Contiene exploits, payloads y herramientas post-explotación.', 'Se utiliza para la fase de explotación después del reconocimiento. Permite ejecutar exploits contra vulnerabilidades conocidas.', 'Ventajas: Enorme base de exploits, integración con Meterpreter. Riesgos: Exploits pueden ser detectados por AV.', 'exploitation', 'https://www.metasploit.com', NULL),
('55555555-5555-5555-5555-555555555555', 'Hydra', 'Herramienta de cracking de contraseñas por fuerza bruta que soporta numerosos protocolos.', 'Se usa cuando se necesita probar la fortaleza de contraseñas en servicios de red.', 'Ventajas: Soporta muchos protocolos, muy rápido. Riesgos: Puede bloquear cuentas, generar alertas.', 'credentials', 'https://github.com/vanhauser-thc/thc-hydra', NULL),
('66666666-6666-6666-6666-666666666666', 'SQLmap', 'Herramienta automática de detección y explotación de vulnerabilidades de inyección SQL.', 'Se utiliza cuando se sospecha o confirma una vulnerabilidad SQLi. Automatiza la detección y explotación.', 'Ventajas: Altamente automatizado, soporta múltiples técnicas. Riesgos: Puede dañar bases de datos, muy ruidoso.', 'web', 'https://sqlmap.org', NULL),
('77777777-7777-7777-7777-777777777777', 'Feroxbuster', 'Herramienta de fuzzing de contenido web escrita en Rust. Extremadamente rápida.', 'Se usa para descubrir directorios, archivos y endpoints ocultos en aplicaciones web.', 'Ventajas: Muy rápido, recursivo por defecto. Riesgos: Puede sobrecargar servidores.', 'web', 'https://github.com/epi052/feroxbuster', NULL),
('88888888-8888-8888-8888-888888888888', 'Gobuster', 'Herramienta de fuerza bruta para URIs, subdominios DNS y virtual hosts. Escrita en Go.', 'Similar a Feroxbuster, se usa para descubrir contenido oculto en servidores web y enumerar subdominios.', 'Ventajas: Rápido, simple de usar, múltiples modos. Riesgos: No es recursivo por defecto.', 'reconnaissance', 'https://github.com/OJ/gobuster', NULL),
('99999999-9999-9999-9999-999999999999', 'Wfuzz', 'Herramienta de fuzzing web diseñada para fuerza bruta de parámetros en aplicaciones web.', 'Se utiliza para descubrir recursos ocultos, fuzzear parámetros GET/POST, headers, cookies.', 'Ventajas: Muy flexible, puede fuzzear cualquier parte del request. Riesgos: Curva de aprendizaje.', 'web', 'https://github.com/xmendez/wfuzz', NULL)
ON CONFLICT DO NOTHING;

-- Insert default commands for Nmap
INSERT INTO commands (tool_id, command, description, example, flags_params) VALUES
('11111111-1111-1111-1111-111111111111', 'nmap -sS <target>', 'Escaneo SYN sigiloso (requiere root)', 'nmap -sS 192.168.1.1', ARRAY['-sS: SYN scan']),
('11111111-1111-1111-1111-111111111111', 'nmap -sV <target>', 'Detectar versiones de servicios', 'nmap -sV 192.168.1.1', ARRAY['-sV: Version detection']),
('11111111-1111-1111-1111-111111111111', 'nmap -A <target>', 'Escaneo agresivo completo', 'nmap -A 192.168.1.1', ARRAY['-A: Aggressive scan']),
('11111111-1111-1111-1111-111111111111', 'nmap -p- <target>', 'Escanear todos los puertos', 'nmap -p- 192.168.1.1', ARRAY['-p-: All 65535 ports'])
ON CONFLICT DO NOTHING;

-- Insert commands for other tools
INSERT INTO commands (tool_id, command, description, example, flags_params) VALUES
('22222222-2222-2222-2222-222222222222', 'nikto -h <target>', 'Escaneo básico de un host', 'nikto -h http://192.168.1.1', ARRAY['-h: Target host']),
('33333333-3333-3333-3333-333333333333', 'Configurar proxy en 127.0.0.1:8080', 'Configurar navegador para interceptar tráfico', 'Firefox > Settings > Proxy > 127.0.0.1:8080', ARRAY[]::TEXT[]),
('44444444-4444-4444-4444-444444444444', 'msfconsole', 'Iniciar consola de Metasploit', 'msfconsole', ARRAY[]::TEXT[]),
('44444444-4444-4444-4444-444444444444', 'search <term>', 'Buscar exploits/módulos', 'search eternalblue', ARRAY[]::TEXT[]),
('55555555-5555-5555-5555-555555555555', 'hydra -l <user> -P <wordlist> <target> ssh', 'Fuerza bruta SSH', 'hydra -l admin -P rockyou.txt 192.168.1.1 ssh', ARRAY['-l: Single username', '-P: Password wordlist']),
('66666666-6666-6666-6666-666666666666', 'sqlmap -u <url>', 'Escaneo básico de SQLi', 'sqlmap -u "http://target.com/page?id=1"', ARRAY['-u: Target URL with parameter']),
('66666666-6666-6666-6666-666666666666', 'sqlmap -u <url> --dbs', 'Enumerar bases de datos', 'sqlmap -u "http://target.com/page?id=1" --dbs', ARRAY['--dbs: Enumerate databases']),
('77777777-7777-7777-7777-777777777777', 'feroxbuster -u <url>', 'Escaneo básico con wordlist por defecto', 'feroxbuster -u http://target.com', ARRAY['-u: Target URL']),
('88888888-8888-8888-8888-888888888888', 'gobuster dir -u <url> -w <wordlist>', 'Enumeración de directorios', 'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt', ARRAY['dir: Directory mode', '-u: URL', '-w: Wordlist']),
('99999999-9999-9999-9999-999999999999', 'wfuzz -c -w <wordlist> <url>/FUZZ', 'Fuzzing básico de directorios', 'wfuzz -c -w /usr/share/wordlists/dirb/common.txt http://target.com/FUZZ', ARRAY['-c: Colored output', '-w: Wordlist', 'FUZZ: Injection point'])
ON CONFLICT DO NOTHING;
