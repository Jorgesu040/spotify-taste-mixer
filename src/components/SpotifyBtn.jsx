'use client'

// Estilos que siempre se aplican
const baseStyles = "px-4 py-2 rounded-full transition cursor-pointer align-middle disabled:opacity-50 disabled:cursor-default"

// Estilos por defecto (colores Spotify)
const defaultStyles = "bg-spotify-green text-white hover:bg-spotify-green-light"

export default function SpotifyBtn({ onClick, children, disabled, className }) {
    // Si className es "none", solo se aplican los estilos base
    // Si className existe, se aplica base + className
    // Si no hay className, se aplica base + default
    const appliedStyles = className === "none" 
        ? baseStyles 
        : `${baseStyles} ${className || defaultStyles}`

    return (
        <button
            className={appliedStyles}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}