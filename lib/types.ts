// Type definitions for Red Team Tools

export interface Profile {
  id: string
  username: string
  full_name: string
  date_of_birth: string
  email: string
  created_at: string
  updated_at: string
}

export interface Command {
  id: string
  tool_id: string
  command: string
  description: string
  example: string | null
  flags_params: FlagParam[]
  created_at: string
}

export interface FlagParam {
  flag: string
  description: string
}

export type ToolCategory = "reconnaissance" | "web" | "exploitation" | "credentials" | "general"

export interface Tool {
  id: string
  name: string
  description: string
  scenario?: string
  risks_advantages?: string
  category: ToolCategory
  official_url?: string
  created_at: string
}

export const categoryLabels: Record<ToolCategory, string> = {
  reconnaissance: "Reconocimiento",
  web: "Web",
  exploitation: "Explotación",
  credentials: "Credenciales",
  general: "General",
}

export const categoryColors: Record<ToolCategory, string> = {
  reconnaissance: "border-blue-500 bg-blue-50 text-blue-700",
  web: "border-purple-500 bg-purple-50 text-purple-700",
  exploitation: "border-red-500 bg-red-50 text-red-700",
  credentials: "border-yellow-500 bg-yellow-50 text-yellow-700",
  general: "border-gray-500 bg-gray-50 text-gray-700",
}
