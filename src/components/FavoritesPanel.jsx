'use client'

import { Star, Trash2, Plus } from "lucide-react"
import TrackItem from "./widgets/items/TrackItem"

export default function FavoritesPanel({ favorites = [], onAddToPlaylist, onRemoveFavorite, className }) {

    const handleAddToPlaylist = (track) => {
        onAddToPlaylist?.(track)
    }

    return (
        <section className={`bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={24} />
                    <h2 className="text-foreground font-bold text-xl">Favoritos</h2>
                </div>
                <span className="text-spotify-gray-light text-sm">
                    {favorites.length} guardados
                </span>
            </div>

            {/* Favorites list */}
            {favorites.length === 0 ? (
                <div className="text-center py-8 text-spotify-gray-light">
                    <Star size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No tienes favoritos</p>
                    <p className="text-sm">Marca canciones con <Star className="inline" size={12} /> para guardarlas</p>
                </div>
            ) : (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    {favorites.map((track) => (
                        <div key={track.id} className="group relative">
                            <TrackItem 
                                bg="bg-spotify-gray-mid"
                                onSelect={() => handleAddToPlaylist(track)}
                                isSelected={false}
                            >
                                {track}
                            </TrackItem>
                            
                            {/* Overlay actions */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {onAddToPlaylist && (
                                    <button
                                        onClick={() => {
                                            handleAddToPlaylist(track)
                                        }}
                                        className="p-1.5 rounded-full bg-spotify-green text-black transition-colors"
                                        title="Añadir a playlist"
                                    >
                                        <Plus size={14} />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        onRemoveFavorite?.(track.id)
                                    }}
                                    className="p-1.5 rounded-full bg-spotify-gray-dark/80 text-spotify-gray-light hover:text-red-500 transition-colors"
                                    title="Eliminar de favoritos"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
