const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function login(email: string, password: string) {
  const formData = new URLSearchParams()
  formData.append("username", email) // OAuth2 expects username field but we're using email as the username
  formData.append("password", password)

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Login failed")
  }

  return response.json()
}

export async function register(fullName: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName,
      email,
      password,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Registration failed")
  }

  return response.json()
}

export async function fetchUserData(token: string) {
  const response = await fetch(`${API_URL}/auth/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user data")
  }

  return response.json()
}
