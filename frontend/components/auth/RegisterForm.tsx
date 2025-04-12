'use client';

// Preset imports
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Brain, Loader2 } from 'lucide-react';

// Custom imports
import { register } from '@/lib/api';

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError('');

    const form = new FormData(event.currentTarget);
    const fullName = form.get('fullName') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const confirmPassword = form.get('confirmPassword') as string;

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
        setError('All fields are required');
        setIsLoading(false);
        return;
    }
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
    }

    try {
        // Call register API  
        await register(fullName, email, password);

        // Redirect to login page on successful registration
        router.push('/login?registered=true');
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
                    Create an account
                </CardTitle>
                <CardDescription className="text-gray-400 text-center">
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>

            <CardContent>
                {error && (
                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    {[
                        { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                        { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                        { id: 'password', label: 'Password', type: 'password' },
                        { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
                    ].map(({ id, label, type, placeholder }) => (
                        <div key={id} className="space-y-2">
                        <Label htmlFor={id} className="text-gray-300">{label}</Label>
                        <Input
                            id={id}
                            name={id}
                            type={type}
                            placeholder={placeholder}
                            required
                            className="bg-gray-800/50 border-gray-700 text-gray-100 focus:border-cyan-500 focus:ring-cyan-500/20"
                        />
                        </div>
                    ))}

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                        ) : (
                        'Create Account'
                        )}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t border-gray-800 pt-4">
                {/* <p className="text-sm text-center text-gray-400">
                By creating an account, you agree to our{' '}
                <Link href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</Link> and{' '}
                <Link href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link>.
                </p> */}
                <p className="text-sm text-center text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-cyan-400 hover:text-cyan-300">Log in</Link>
                </p>
            </CardFooter>
        </Card>
  );
}