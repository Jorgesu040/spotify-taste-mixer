'use client'

export default function SpotifyBtn({ onClick, children }) {
    return (
        <button
            className="bg-spotify-green text-white px-4 py-2 rounded-full hover:bg-spotify-green-light transition cursor-pointer align-middle"
            onClick={onClick}
        >
            {children}
        </button>
    )
}