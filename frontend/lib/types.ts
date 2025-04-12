export interface AuthResponse {
    access_token: string;
    refresh_token: string;
}
  
export interface ApiError {
    detail: string;
}

export interface UserData {
    id: string;
    full_name: string;
    email: string;
    created_at: string;
    // Add more fields based on FastAPI user schema
}