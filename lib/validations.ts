// Frontend validation utilities for Red Team Tools

export interface ValidationResult {
  isValid: boolean
  message: string
}

// Username validation: lowercase only, letters or letters+numbers, not only numbers
export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false, message: "El nombre de usuario es requerido" }
  }

  if (username !== username.toLowerCase()) {
    return { isValid: false, message: "Solo se permiten minúsculas" }
  }

  if (/^\d+$/.test(username)) {
    return { isValid: false, message: "No puede ser solo números" }
  }

  if (!/^[a-z][a-z0-9]*$/.test(username)) {
    return { isValid: false, message: "Debe comenzar con letra y contener solo letras y números" }
  }

  if (username.length < 3 || username.length > 20) {
    return { isValid: false, message: "Debe tener entre 3 y 20 caracteres" }
  }

  return { isValid: true, message: "" }
}

// Full name validation
export function validateFullName(name: string): ValidationResult {
  if (!name) {
    return { isValid: false, message: "El nombre completo es requerido" }
  }

  if (name.length < 2 || name.length > 100) {
    return { isValid: false, message: "Debe tener entre 2 y 100 caracteres" }
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name)) {
    return { isValid: false, message: "Solo se permiten letras y espacios" }
  }

  return { isValid: true, message: "" }
}

// Date of birth validation: realistic date, minimum 18 years old
export function validateDateOfBirth(dateString: string): ValidationResult {
  if (!dateString) {
    return { isValid: false, message: "La fecha de nacimiento es requerida" }
  }

  const date = new Date(dateString)
  const today = new Date()
  const minDate = new Date(1920, 0, 1)

  if (isNaN(date.getTime())) {
    return { isValid: false, message: "Fecha inválida" }
  }

  if (date < minDate) {
    return { isValid: false, message: "Fecha no realista" }
  }

  if (date > today) {
    return { isValid: false, message: "La fecha no puede ser futura" }
  }

  // Calculate age
  let age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--
  }

  if (age < 18) {
    return { isValid: false, message: "Debes tener al menos 18 años" }
  }

  if (age > 120) {
    return { isValid: false, message: "Fecha no realista" }
  }

  return { isValid: true, message: "" }
}

// Email validation with professional regex
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, message: "El correo electrónico es requerido" }
  }

  // RFC 5322 compliant email regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Formato de correo inválido" }
  }

  // Check for common domains
  const domain = email.split("@")[1]
  if (!domain || domain.length < 3 || !domain.includes(".")) {
    return { isValid: false, message: "Dominio de correo inválido" }
  }

  return { isValid: true, message: "" }
}

// Password validation
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, message: "La contraseña es requerida" }
  }

  if (password.length < 8) {
    return { isValid: false, message: "Mínimo 8 caracteres" }
  }

  if (password.length > 128) {
    return { isValid: false, message: "Máximo 128 caracteres" }
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Debe contener al menos una mayúscula" }
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: "Debe contener al menos una minúscula" }
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Debe contener al menos un número" }
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { isValid: false, message: "Debe contener al menos un carácter especial" }
  }

  return { isValid: true, message: "" }
}

// Confirm password validation
export function validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) {
    return { isValid: false, message: "Confirma tu contraseña" }
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Las contraseñas no coinciden" }
  }

  return { isValid: true, message: "" }
}

// Login validations
export function validateLoginUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false, message: "El usuario es requerido" }
  }

  if (username.length < 3) {
    return { isValid: false, message: "Usuario demasiado corto" }
  }

  return { isValid: true, message: "" }
}

export function validateLoginPassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, message: "La contraseña es requerida" }
  }

  if (password.length < 1) {
    return { isValid: false, message: "Ingresa tu contraseña" }
  }

  return { isValid: true, message: "" }
}
