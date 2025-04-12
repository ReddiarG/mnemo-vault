'use client';

// Preset imports
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

// Custom imports
import { login } from '@/lib/api';
import { setAuthToken, setRefreshToken } from '@/lib/auth';

export default function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		// Check if user just registered
		if (searchParams.get('registered') === 'true') {
			setSuccess('Account created successfully! Please log in.');
		}
	}, [searchParams]);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess('');

    const form = new FormData(event.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

	// Basic validation
    if (!email || !password) {
		setError('Email and password are required');
		setIsLoading(false);
		return;
    }

    try {
		// Call login API
		const data = await login(email, password);

		// Store JWT tokens in local storage
		setAuthToken(data.access_token);
		setRefreshToken(data.refresh_token);

		// DEBUGGING ONLY:
		// console.log('Stored access token:', localStorage.getItem('access_token'))
		// console.log('Stored refresh token:', localStorage.getItem('refresh_token'))

		// Redirect to User Workspace
		router.push('/workspace');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred');
		} finally {
			setIsLoading(false);
		}
  }

  return (
    <Card className="border-gray-800 bg-gray-900/70 backdrop-blur-sm shadow-xl">
		<CardHeader className="space-y-1">
			<div className="flex justify-center mb-2">
				<div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
					<Brain className="h-6 w-6" />
				</div>
			</div>
			<CardTitle className="text-2xl font-bold text-center text-gray-100">
				Log in to your account
			</CardTitle>
			<CardDescription className="text-gray-400 text-center">
				Enter your email and password to access your account
			</CardDescription>
		</CardHeader>

		<CardContent>
			{error && (
			<Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800 text-red-400">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>{error}</AlertDescription>
			</Alert>
			)}

			{success && (
			<Alert className="mb-4 bg-green-900/20 border-green-800 text-green-400">
				<CheckCircle className="h-4 w-4" />
				<AlertDescription>{success}</AlertDescription>
			</Alert>
			)}

			<form onSubmit={onSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email" className="text-gray-300">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="john@example.com"
						required
						className="bg-gray-800/50 border-gray-700 text-gray-100 focus:border-cyan-500 focus:ring-cyan-500/20"
					/>
				</div>
				
				<div className="space-y-2">
					<div className="flex items-center justify-between">
					<Label htmlFor="password" className="text-gray-300">Password</Label>
					{/* TODO: Implement Forgot Password functionality */}
					{/* <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">Forgot password?</Link> */}
					</div>
					<Input
						id="password"
						name="password"
						type="password"
						required
						className="bg-gray-800/50 border-gray-700 text-gray-100 focus:border-cyan-500 focus:ring-cyan-500/20"
					/>
				</div>

				<Button
					type="submit"
					className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black"
					disabled={isLoading}
				>
					{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Logging in...
					</>
					) : (
						'Log In'
					)}
				</Button>
			</form>
		</CardContent>

		<CardFooter className="flex justify-center border-t border-gray-800 pt-4">
			<div className="text-sm text-center text-gray-400">
			Don't have an account?{' '}
			<Link href="/register" className="text-cyan-400 hover:text-cyan-300">Sign up</Link>
			</div>
		</CardFooter>
    </Card>
  );
}