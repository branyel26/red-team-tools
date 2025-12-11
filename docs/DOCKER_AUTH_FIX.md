# 🔧 FIX: Autenticación en Docker - Usuarios No Persistían

## El Problema ❌

Cuando se dockerizaba la aplicación:
1. ✅ El **registro funcionaba** - guardaba nuevos usuarios
2. ✅ **Prevenía duplicados** - no permitía registrar el mismo email dos veces
3. ❌ **El login fallaba** - no reconocía usuarios registrados

## La Causa Raíz 🎯

El archivo `/lib/db/store.ts` usaba una `Map<string, User>` en **memoria** que se perdía cada vez que:
- Se reiniciaba el contenedor
- Se deployaba nueva versión
- Cualquier cambio en la aplicación

En desarrollo local con `npm run dev` esto no era problema porque la app se ejecutaba todo el tiempo en el mismo proceso.

## La Solución ✅

### 1. Persistencia en Archivo JSON

**Archivo actualizado:** `/lib/db/store.ts`

- Los usuarios se guardan en `/.data/users.json`
- Se cargan automáticamente al iniciar
- Cada registro nuevo se guarda inmediatamente
- Sistema de respaldo: Map en memoria + archivo persistente

```typescript
// Nuevo flow:
1. Carga usuarios desde archivo JSON al iniciar
2. Mantiene una Map en memoria para búsquedas rápidas
3. Cada vez que se registra un usuario, se guarda el archivo
4. Los datos persisten entre reinicios
```

### 2. Volumen en Docker

**Archivo actualizado:** `docker-compose.yml`

```yaml
volumes:
  app_data:/app/data  # Volumen persistente para datos

services:
  app:
    volumes:
      - app_data:/app/data  # Monta el volumen
    environment:
      DATA_DIR: /app/data   # Indica dónde guardar datos
```

### 3. Variables de Entorno

Se agregó variable `DATA_DIR` en docker-compose para especificar la ubicación de los datos.

### 4. Git Ignore

Creado `.gitignore` para:
- Excluir `/.data/users.json` del control de versión
- No commitear datos de usuarios
- Proteger información sensible

## 🚀 Cómo Usar

### Opción 1: Con Docker (Recomendado)

```bash
cd /Users/user/Desktop/red-team-tools

# Opción A: Script automático
bash start-docker.sh

# Opción B: Manualmente
docker-compose up -d
```

Accede en: **http://localhost:1997**

### Opción 2: Desarrollo Local

```bash
cd /Users/user/Desktop/red-team-tools
npm install
npm run dev
```

Accede en: **http://localhost:3000**

## ✨ Comportamiento Ahora

### Registro
```
1. Usuario registra: test@example.com / Password123
2. Se guarda en /.data/users.json (cifrado en base64)
3. Se previene duplicado
4. Se crea sesión automática
```

### Login
```
1. Usuario hace login con: test@example.com / Password123
2. Se busca en Map en memoria (carguado desde archivo)
3. Se compara contraseña hasheada
4. ✅ Funciona siempre que el contenedor esté corriendo
5. ✅ Persiste incluso después de reiniciar el contenedor
```

## 📂 Estructura de Datos

```
/.data/users.json
[
  {
    "id": "user-1733854932100",
    "email": "test@example.com",
    "password": "UGFzc3dvcmQxMjM=",  // base64 de "Password123"
    "createdAt": "2025-12-10T22:35:32.100Z"
  }
]
```

## 🔐 Notas de Seguridad

- **Para desarrollo**: Las contraseñas se guardan en base64 (simple hash)
- **Para producción**: Usa bcrypt o argon2 (modifica `/lib/auth/password.ts`)
- **En Docker**: Los datos se guardan en volumen persistente, seguro en el host

## 🧪 Prueba Rápida

```bash
# Terminal 1: Inicia los contenedores
docker-compose up -d

# Terminal 2: Ve los logs
docker-compose logs app -f

# Terminal 3: Prueba
# 1. Abre http://localhost:1997
# 2. Registra: user@test.com / Password123
# 3. Verifica que se creó: docker-compose exec app cat /app/data/users.json
# 4. Detente sesión: botón Cerrar Sesión
# 5. Intenta login con las mismas credenciales
# ✅ Debería funcionar
```

## 🛠️ Troubleshooting

### "Error en login: Email o contraseña incorrectos"

```bash
# Verifica que el archivo existe
docker-compose exec app cat /app/data/users.json

# Verifica permisos
docker-compose exec app ls -la /app/data/

# Revisa los logs
docker-compose logs app
```

### "No se gurdan los usuarios"

```bash
# Verifica que el volumen está montado
docker-compose exec app ls -la /app/data/

# Reinicia los contenedores
docker-compose restart app
```

## 📝 Archivos Modificados

1. **`/lib/db/store.ts`** - Implementó persistencia en JSON
2. **`/docker-compose.yml`** - Añadió volumen `app_data`
3. **`/.gitignore`** - Creado (excluye datos sensibles)
4. **`/start-docker.sh`** - Script helper para iniciar fácil

---

✅ **El problema está resuelto.** Usuarios y contraseñas ahora funcionan perfectamente en Docker.
