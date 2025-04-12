import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "./constants";

export function getAuthToken() {
    return typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
}

export function setAuthToken(token: string) {
	if (typeof window !== "undefined") {
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
	}
}

export function removeAuthToken() {
	if (typeof window !== "undefined") {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
	}
}

export function getRefreshToken() {
	return typeof window !== "undefined" ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
}

export function setRefreshToken(token: string) {
	if (typeof window !== "undefined") {
		localStorage.setItem(REFRESH_TOKEN_KEY, token);
	}
}

export function removeRefreshToken() {
	if (typeof window !== "undefined") {
	  	localStorage.removeItem(REFRESH_TOKEN_KEY);
	}
}

export function isAuthenticated() {
	return !!getAuthToken()
}

export async function refreshToken(): Promise<boolean> {
	const refreshToken = getRefreshToken();
	if (!refreshToken) return false;

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
			method: "POST",
			headers: { 
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({ 
				refresh_token: refreshToken 
			}),
		});

		if (!response.ok) {
			removeAuthToken();
			removeRefreshToken();
			return false;
		}

		const data = await response.json();
		setAuthToken(data.access_token);
		setRefreshToken(data.refresh_token);
		return true;
	} catch (err) {
		console.error("Token refresh error:", err);
		removeAuthToken();
		removeRefreshToken();
		return false;
	}
}
