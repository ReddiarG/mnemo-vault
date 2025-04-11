// Refresh the access token using the stored refresh token
export async function refreshToken():Promise <Boolean> {
    const refreshToken = localStorage.getItem("refresh_token")
  
    if (!refreshToken) return false
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refresh_token: refreshToken })
      })
  
      if (!response.ok) {
        removeAuthToken()
        removeRefreshToken()
        return false
      }
  
      const data = await response.json()
      setAuthToken(data.access_token)
      setRefreshToken(data.refresh_token)
      return true
    } catch (error) {
      removeAuthToken()
      removeRefreshToken()
      return false
    }
  }
  
  export function getAuthToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token")
    }
    return null
  }
  
  export function setAuthToken(accessToken: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken)
    }
  }
  
  export function removeAuthToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
    }
  }

  export function setRefreshToken(refreshToken: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("refresh_token", refreshToken)
    }
  }
  
  export function getRefreshToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refresh_token")
    }
    return null
  }
  
  export function removeRefreshToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("refresh_token")
    }
  }
  
  export function isAuthenticated() {
    return !!getAuthToken()
  }
  