'use client'

import Image from "next/image"

// Formatear duración de ms a mm:ss
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function TrackItem({ children }) {
    const track = children

    return (
        <div className="flex flex-col items-center p-4 rounded-lg bg-spotify-gray-dark hover:bg-spotify-gray-mid transition-colors cursor-pointer">
            {track.album?.images?.[0]?.url ? (
                <div className="w-[150px] h-[150px] rounded-md overflow-hidden">
                    <Image 
                        src={track.album.images[0].url} 
                        alt={track.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-[150px] h-[150px] rounded-md bg-spotify-gray-mid flex items-center justify-center">
                    <span className="text-spotify-gray-light text-4xl">?</span>
                </div>
            )}
            
            <h2 className="mt-3 text-foreground font-semibold text-center truncate w-full">
                {track.name}
            </h2>
            
            <p className="text-spotify-gray-light text-sm truncate w-full text-center">
                {track.artists?.map(a => a.name).join(', ')}
            </p>

            <div className="flex items-center gap-2 mt-1 text-xs text-spotify-gray-light">
                {track.duration_ms && (
                    <span>{formatDuration(track.duration_ms)}</span>
                )}
                {track.explicit && (
                    <span className="bg-spotify-gray-mid px-1 rounded text-[10px]">E</span>
                )}
            </div>
        </div>
    )
}