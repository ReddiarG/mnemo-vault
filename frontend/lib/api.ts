import { AuthResponse, UserData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Common API Error handler
function handleApiError(response: Response): Promise<never> {
	return response
		.json()
		.then((data) => {
			throw new Error(data.detail || "Something went wrong");
		})
		.catch(() => {
			throw new Error("Unexpected error from server");
		});
}

// Common Fetch API Helper 
export async function fetchWithAuth<T>(path: string, token: string): Promise<T> {
	const response = await fetch(`${API_URL}${path}`, {
		headers: { 
			Authorization: `Bearer ${token}` 
		},
	});

	if (!response.ok) return handleApiError(response);

	return response.json();
}

// User Register API
export async function register(fullName: string, email: string, password: string): Promise<AuthResponse> {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ 
			full_name: fullName, 
			email, 
			password 
		}),
	});
  
	if (!response.ok) return handleApiError(response);
	
	return response.json();
}

// User Login API
export async function login(email: string, password: string): Promise<AuthResponse> {
	const formData = new URLSearchParams();
	formData.append("username", email); // OAuth2 expects username field but we're using email as the username
	formData.append("password", password);

	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formData,
	});

	if (!response.ok) return handleApiError(response);

	return response.json();
}

// User Details API
export async function fetchUserData(token: string): Promise<UserData> {
	return fetchWithAuth<UserData>("/auth/users/me", token);
}
