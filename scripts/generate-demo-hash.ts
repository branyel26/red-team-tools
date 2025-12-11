// Script to generate the correct hash for demo user
async function generateHash() {
  const password = "Demo123!"
  const encoder = new TextEncoder()
  const data = encoder.encode(password + "red-team-tools-salt-2024")
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  console.log("Demo password hash:", hash)
  return hash
}

generateHash()
