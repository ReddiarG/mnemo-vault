"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Brain } from "lucide-react"
import { fetchUserData } from "@/lib/api"
import { getAuthToken, removeAuthToken, isAuthenticated, removeRefreshToken, getRefreshToken } from "@/lib/auth"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    // Use the next line for debugging purpose ONLY
    // console.log("Auth token in localStorage:", getAuthToken())

    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    // Fetch user data
    async function getUserData() {
      try {
        const access_token = getAuthToken()
        if (!access_token) {
          throw new Error("No authentication token found")
        }

        const userData = await fetchUserData(access_token)
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
        // Handle authentication error
        removeAuthToken()
        removeRefreshToken()
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    getUserData()
  }, [router])

  const handleLogout = () => {
    removeAuthToken()
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-cyan-400">
            <Brain className="h-5 w-5" />
            <span>Mnemo-vault</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-6 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Welcome, {user?.full_name}</h1>
          <p className="text-gray-400">Here's an overview of your account</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900/70 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-100">Account Information</CardTitle>
              <CardDescription className="text-gray-400">Your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-400">Name</div>
                  <div className="text-gray-200">{user?.full_name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-gray-200">{user?.email}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/70 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-100">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400 text-center py-6">No recent activity to display</div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/70 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-100">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-gray-200" variant="outline">
                Edit Profile
              </Button>
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-gray-200" variant="outline">
                Change Password
              </Button>
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-gray-200" variant="outline">
                Notification Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Mnemo-vault. All rights reserved.</p>
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </footer>
    </div>
  )
}
