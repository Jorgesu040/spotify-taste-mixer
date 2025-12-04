"use client";

import TextSpanWrapper from "@/components/TextSpanWrapper"
import { useState, useEffect } from "react"
import SpotifyBtn from "@/components/SpotifyBtn"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export default function SiteHeader() {

    const router = useRouter();

    // Avoid hydration mismatch: start with `null` (unknown) and determine auth only on the client
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        // Only run authentication checks on the client
        if (typeof window === 'undefined') return;

        const auth = isAuthenticated();
        setAuthenticated(auth);

        if (!auth) {
            // Redirect to home/login if not authenticated
            router.replace('/');
        }
    }, [router]);

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    // Mientras no sabemos el estado de autenticación, evitamos renderizar para que el
    // HTML del servidor coincida con el cliente (esto evita la hidración mismatch).
    if (authenticated === null) return null;

    if (!authenticated) return null;


    return (
        <>
            <header className="bg-gray-900 flex items-center justify-between p-4">
                <aside className="mr-auto flex flex-col sm:flex-row items-center  gap-2">
                    <TextSpanWrapper makeSmall={true}>Taste Mixer</TextSpanWrapper>
                    <span
                      className="hidden sm:inline-block mx-2 self-center h-8 w-[1.5px] bg-spotify-green-light rounded select-none"
                      aria-hidden
                    />
                    <TextSpanWrapper makeSmall={true}>Dashboard</TextSpanWrapper>
                </aside>
                
                <nav className={`md:flex`}>
                    
                    <SpotifyBtn onClick={handleLogout}>Logout</SpotifyBtn>
                    
                </nav>
            </header>
        </>
    )


}
