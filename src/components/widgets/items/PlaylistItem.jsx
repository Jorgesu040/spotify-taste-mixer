'use client'

import { Music2, Loader2 } from 'lucide-react'

export default function PlaylistItem({
    children,
    onSelect,
    isImporting = false,
    bg = 'bg-spotify-gray-dark'
}) {
    const playlist = children

    return (
        <button
            onClick={() => onSelect(playlist)}
            disabled={isImporting}
            className={`flex items-center gap-3 p-2 rounded-lg ${bg} hover:bg-spotify-gray-light/20 transition-all cursor-pointer w-full text-left group border border-transparent hover:border-white/10`}
        >
            {/* Imagen */}
            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-spotify-gray-mid shadow-lg">
                {playlist.images?.[0]?.url ? (
                    <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <Music2 size={20} />
                    </div>
                )}
            </div>

            {/* Información */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate group-hover:text-spotify-green transition-colors text-sm">
                    {playlist.name}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                    {playlist.tracks?.total || 0} canciones
                </p>
            </div>

            {/* Estado de Carga */}
            {isImporting && (
                <Loader2 className="w-5 h-5 animate-spin text-spotify-green" />
            )}
        </button>
    )
}
