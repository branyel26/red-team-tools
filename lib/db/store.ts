import { readFileSync, writeFileSync, existsSync } from "fs"

export interface User {
  id: string
  email: string
  password: string
  createdAt: string
}

// Store persistente en /app/users.json (con volumen montado)
const USERS_FILE = "/app/users.json"

console.log(`[STORE] USERS_FILE=${USERS_FILE}`)

// Guardar usuarios en el archivo
function saveUsersToFile(users: Map<string, User>) {
  try {
    const data = Array.from(users.values())
    writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf-8")
    console.log(`[STORE] ✅ Guardados ${data.length} usuarios`)
  } catch (error) {
    console.error(`[STORE] ❌ Error guardando usuarios:`, error)
  }
}

// Cargar usuarios del archivo
function loadUsers(): Map<string, User> {
  const users = new Map<string, User>()

  try {
    if (existsSync(USERS_FILE)) {
      const data = readFileSync(USERS_FILE, "utf-8")
      const parsed = JSON.parse(data)

      if (Array.isArray(parsed)) {
        parsed.forEach((user) => {
          users.set(user.id, user)
        })
        console.log(`[STORE] ✅ Cargados ${parsed.length} usuarios`)
      }
    } else {
      console.log(`[STORE] ⚠️  Archivo de usuarios no existe aún`)
    }
  } catch (error) {
    console.error(`[STORE] ❌ Error cargando usuarios:`, error)
  }

  return users
}

// Map en memoria con respaldo en archivo
let usersMap = loadUsers()

export function getUserByEmail(email: string): User | undefined {
  // Recargar usuarios desde archivo antes de buscar
  usersMap = loadUsers()
  const user = Array.from(usersMap.values()).find((user) => user.email === email)
  if (user) {
    console.log(`[STORE] ✅ Usuario encontrado: ${email}`)
  }
  return user
}

export function saveUser(userData: { email: string; password: string }): User {
  const user: User = {
    id: `user-${Date.now()}`,
    email: userData.email,
    password: userData.password,
    createdAt: new Date().toISOString(),
  }

  usersMap.set(user.id, user)
  saveUsersToFile(usersMap)
  console.log(`[STORE] ✅ Usuario registrado: ${user.email}`)

  return user
}
