'use client'

export default function SpotifyBtn({ onClick, children, disabled }) {
    return (
        <button
            className="bg-spotify-green text-white px-4 py-2 rounded-full hover:bg-spotify-green-light transition cursor-pointer align-middle disabled:opacity-50 disabled:cursor-default"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}