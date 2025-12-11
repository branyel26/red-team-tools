export function hashPassword(password: string): string {
  // Simple hash para desarrollo
  return Buffer.from(password).toString("base64")
}

export function validatePassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}
