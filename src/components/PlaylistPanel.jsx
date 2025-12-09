'use client'

import { ListMusic, Star, Trash2, User, Palette, Search, Music } from "lucide-react"
import TrackItem from "./widgets/items/TrackItem"
import SpotifyBtn from "./SpotifyBtn"

// Get source badge info
function getSourceBadge(source) {
    if (!source) return null
    switch (source.type) {
        case 'artist':
            return { icon: User, label: source.name, color: 'bg-purple-500/20 text-purple-300' }
        case 'genre':
            return { icon: Palette, label: source.name, color: 'bg-blue-500/20 text-blue-300' }
        case 'search':
            return { icon: Search, label: 'Búsqueda', color: 'bg-gray-500/20 text-gray-300' }
        case 'favorite':
            return { icon: Star, label: 'Favoritos', color: 'bg-yellow-500/20 text-yellow-300' }
        case 'decade':
            return { icon: Music, label: source.name, color: 'bg-green-500/20 text-green-300' }
        default:
            return null
    }
}

export default function PlaylistPanel({
    tracks = [],
    onRemoveTrack,
    popularityRange = [0, 100],
    favorites = [],
    onToggleFavorite,
    className
}) {
    // Check if track popularity is within the selected range
    const isOutOfPopularityRange = (track) => {
        const popularity = track.popularity ?? 50 // default to 50 if not available
        return popularity < popularityRange[0] || popularity > popularityRange[1]
    }

    const isFavorite = (trackId) => favorites.some(fav => fav.id === trackId)

    return (
        <section className={`bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <ListMusic className="text-spotify-green" size={24} />
                    <h2 className="text-foreground font-bold text-xl">Tu Playlist</h2>
                </div>
                <span className="text-spotify-gray-light text-sm">
                    {tracks.length} canciones
                </span>
            </div>

            {/* Track list */}
            {tracks.length === 0 ? (
                <div className="text-center py-8 text-spotify-gray-light">
                    <ListMusic size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No hay canciones seleccionadas</p>
                    <p className="text-sm">Usa los widgets para añadir música</p>
                </div>
            ) : (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    {tracks.map((track, index) => {
                        const sourceBadge = getSourceBadge(track.source)
                        const outOfRange = isOutOfPopularityRange(track)
                        return (
                            <div key={track.id} className={`group relative ${outOfRange ? 'opacity-40' : ''}`}>
                                <TrackItem
                                    rank={index + 1}
                                    bg="bg-spotify-gray-mid"
                                    onSelect={() => { }}
                                    isSelected={false}
                                >
                                    {track}
                                </TrackItem>

                                {/* Actions and badges - aligned to the right */}
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                    {/* Source badge */}
                                    {sourceBadge && (
                                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${sourceBadge.color}`}>
                                            <sourceBadge.icon size={10} />
                                            <span>{sourceBadge.label}</span>
                                        </div>
                                    )}

                                    {/* Out of range badge */}
                                    {outOfRange && (
                                        <div className="flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-300">
                                            <span>Fuera de rango ({track.popularity ?? '?'})</span>
                                        </div>
                                    )}

                                    {/* Action buttons */}
                                    <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {
                                                onToggleFavorite?.(track)
                                            }}
                                            className={`p-1.5 rounded-full transition-colors ${isFavorite(track.id)
                                                    ? 'bg-yellow-500 text-black'
                                                    : 'bg-spotify-gray-dark/80 text-spotify-gray-light hover:text-yellow-500'
                                                }`}
                                            title={isFavorite(track.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                                        >
                                            <Star size={14} fill={isFavorite(track.id) ? 'currentColor' : 'none'} />
                                        </button>
                                        {onRemoveTrack && (
                                            <button
                                                onClick={() => {
                                                    onRemoveTrack(track.id)
                                                }}
                                                className="p-1.5 rounded-full bg-spotify-gray-dark/80 text-spotify-gray-light hover:text-red-500 transition-colors"
                                                title="Eliminar de playlist"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}
