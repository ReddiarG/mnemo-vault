'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-3xl" />
            </div>

            <div className="w-full max-w-md relative">
                <Link href="/" className="mb-4 flex items-center text-sm text-gray-400 hover:text-cyan-400">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to home
                </Link>

                <LoginForm />
            </div>
        </div>
    );
}