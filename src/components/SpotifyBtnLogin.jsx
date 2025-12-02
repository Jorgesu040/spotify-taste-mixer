'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

export default function SpotifyBtnLogin({ onClick, children }) {
    return (
        <button
            className="bg-spotify-green text-white px-2 sm:px-4 md:px-8 py-2 rounded-full hover:bg-spotify-green-light transition cursor-pointer flex items-center justify-center gap-2"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faSpotify} size="2x"/>{children}
        </button>
    )
}