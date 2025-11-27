
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/lib/auth';
import SpotifyBtn from '@/components/SpotifyBtn';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        // Si no está autenticado, redirigir al login
        if (!isAuthenticated()) {
            router.push('/');
        }
    }, [router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    }

    // No renderizar nada si no está autenticado
    if (typeof window !== 'undefined' && !isAuthenticated()) {
        return null;
    }

    return (
        <>
            <h1 className='text-3xl mb-4'>Dashboard</h1>
            <SpotifyBtn onClick={handleLogout}>Logout</SpotifyBtn>
        </>
    )
}