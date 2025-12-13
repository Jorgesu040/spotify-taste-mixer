'use client'

import Image from "next/image"
import { Music } from "lucide-react"

// Formatear duración de ms a mm:ss
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}


export default function TrackItem({ 
    children, 
    onSelect, 
    isSelected,
    rank,
    showDuration = true,
    showExplicit = true,
    bg = 'bg-spotify-gray-dark'
}) {
    const track = children

    return (
        <div
            className={`flex items-center gap-3 p-2 rounded-lg ${bg} hover:bg-spotify-gray-light/20 transition-colors cursor-pointer group ${isSelected ? 'ring-2 ring-spotify-green' : ''}`}
            onClick={() => onSelect(track)}
        >
            {rank && (
                <span className="text-spotify-green font-bold text-sm w-6 text-center">
                    {rank}
                </span>
            )}
            {track.album?.images?.[0]?.url ? (
                <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                    <Image
                        src={track.album.images[0].url}
                        alt={track.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            ) : (
                <div className="w-10 h-10 rounded bg-spotify-gray-dark flex items-center justify-center shrink-0">
                    <Music size={16} className="text-spotify-gray-light" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm font-medium truncate">
                    {track.name}
                </p>
                <p className="text-spotify-gray-light text-xs truncate">
                    {track.artists?.map(a => a.name).join(', ')}
                </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-spotify-gray-light">
                {showDuration && track.duration_ms && (
                    <span>{formatDuration(track.duration_ms)}</span>
                )}
                {showExplicit && track.explicit && (
                    <span className="bg-spotify-gray-mid px-1 rounded text-[10px]">E</span>
                )}
            </div>
        </div>
    )
}