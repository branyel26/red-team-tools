# Credenciales de Demostración

## Cuenta Demo

- **Email:** `demo@redteam.tools`
- **Contraseña:** `demo123`
- **Usuario ID:** `user-demo-001`

## Uso

1. Ve a la página de login
2. Ingresa las credenciales demo
3. Se creará automáticamente una sesión válida por 7 días

## Herramientas y Comandos de Demo

### Herramientas Precargadas
- Nmap (Reconocimiento)
- Burp Suite (Web)
- Metasploit (Explotación)
- SQLmap (Web)
- Hydra (Credenciales)

### Comandos de Ejemplo
- Nmap: `nmap -sS <target>`
- SQLmap: `sqlmap -u <url>`
- Hydra: `hydra -l <user> -P <wordlist> <target> ssh`

## Notas de Seguridad

⚠️ **IMPORTANTE:**
- Estas credenciales son SOLO para desarrollo y testing
- NO uses en producción
- Cambia las contraseñas en todos los ambientes
- Usa variables de entorno seguras
- Implementa 2FA en producción

## Testing

Para resetear los datos de demo:
```bash
# Elimina la sesión
rm -rf .next/cache

# Reinicia el servidor
npm run dev
```
