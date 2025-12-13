'use client'

import { useState } from "react"
import { ListMusic, ExternalLink, Loader2 } from "lucide-react"
import CursorBlob from "@/components/CursorBlob"
import WidgetWrapper from "@/components/WidgetWrapper"
import PlaylistPanel from "@/components/PlaylistPanel"
import FavoritesPanel from "@/components/FavoritesPanel"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import DecadeWidget from "@/components/widgets/DecadeWidget"
import GenreWidget from "@/components/widgets/GenreWidget"
import PopularityWidget from "@/components/widgets/PopularityWidget"
import TopWidget from "@/components/widgets/TopWidget"
import TrackWidget from "@/components/widgets/TrackWidget"
import WidgetLimitPopup from "@/components/WidgetLimitPopup"
import SpotifyBtn from "@/components/SpotifyBtn"
import { usePlaylistContext } from "@/hooks/usePlaylistContext"
import { useFilter } from "@/hooks/useFilter"
import { createPlaylistWithTracks } from "@/lib/spotifyFetch"
import Sidebar from "@/components/Sidebar"
import { useWidgetManager } from "@/hooks/useWidgetManager"

// Load favorites from localStorage
function loadFavorites() {
    if (typeof window === 'undefined') return []
    try {
        const saved = localStorage.getItem('favorite_tracks')
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}

export default function Dashboard() {

    const {
        selectedTracks,
        selectedArtists,
        selectedGenres,
        handleArtistSelect,
        handleGenreSelect,
        handleTrackSelect,
        removeTrack,
        addFavoriteToPlaylist,
    } = usePlaylistContext()

    const { widgets, toggleWidget, reorderWidgets, isLoaded } = useWidgetManager()

    const [[popularityRange], [setPopularityRange]] = useFilter()
    const [limitError, setLimitError] = useState(null)

    // Shared favorites state - initialized from localStorage
    const [favorites, setFavorites] = useState(() => loadFavorites())

    // Toggle favorite (add or remove)
    const toggleFavorite = (track) => {
        const isFav = favorites.find(fav => fav.id === track.id)
        let updated
        if (isFav) {
            updated = favorites.filter(fav => fav.id !== track.id)
        } else {
            updated = [...favorites, track]
        }
        setFavorites(updated)
        localStorage.setItem('favorite_tracks', JSON.stringify(updated))
    }

    // Remove from favorites
    const removeFavorite = (trackId) => {
        const updated = favorites.filter(fav => fav.id !== trackId)
        setFavorites(updated)
        localStorage.setItem('favorite_tracks', JSON.stringify(updated))
    }

    // Create Spotify playlist state
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)

    // Filter tracks within popularity range
    // ESTO ES FILTRADO CLIENT-SIDE:
    // Filtramos sobre la lista 'selectedTracks' que ya tenemos en memoria.
    // No hacemos nuevas peticiones a la API al mover el slider, lo que lo hace instantáneo.
    const tracksInRange = selectedTracks.filter(track => {
        const popularity = track.popularity ?? 50
        return popularity >= popularityRange[0] && popularity <= popularityRange[1]
    })

    const canCreatePlaylist = tracksInRange.length > 0

    // Create playlist and open in Spotify
    const handleCreatePlaylist = async () => {
        if (!canCreatePlaylist || isCreatingPlaylist) return

        setIsCreatingPlaylist(true)
        try {
            const playlistName = `Taste Mixer - ${new Date().toLocaleDateString('es-ES')}`
            const description = `Playlist creada con Spotify Taste Mixer. ${tracksInRange.length} canciones.`

            const playlistUrl = await createPlaylistWithTracks(playlistName, tracksInRange, description)

            // Open the playlist in a new tab
            window.open(playlistUrl, '_blank')
        } catch (error) {
            console.error('Error creating playlist:', error)
            setLimitError('Error al crear la playlist. Inténtalo de nuevo.')
        } finally {
            setIsCreatingPlaylist(false)
        }
    }


    return (
        <main className="min-h-screen bg-spotify-gray-darker p-2 sm:p-4 md:p-6 lg:p-8">

            {/* Sidebar & Widget Management */}
            <Sidebar widgets={widgets} onToggle={toggleWidget} onReorder={reorderWidgets} />

            {/* Widgets grid - Dynamic */}
            {!isLoaded ? null : (
                <CursorBlob className="p-4 shadow-[inset_-5px_-10px_30px_-10px_rgba(128,128,128,0.5)] backdrop-blur-md rounded-lg grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch bg-accent/50 transition-all duration-300">
                    {widgets.map((widget) => {
                        if (!widget.visible) return null;

                        return (
                            <WidgetWrapper key={widget.id} cols={widget.cols} storageKey={`widget-${widget.id}-cols`}>
                                {(() => {
                                    switch (widget.id) {
                                        case 'artist':
                                            return <ArtistWidget onSelect={handleArtistSelect} selectedItems={selectedArtists} onLimitError={setLimitError} />;
                                        case 'track':
                                            return <TrackWidget onSelect={handleTrackSelect} selectedItems={selectedTracks} onLimitError={setLimitError} />;
                                        case 'genre':
                                            return <GenreWidget onSelect={handleGenreSelect} selectedItems={selectedGenres} onLimitError={setLimitError} />;
                                        case 'top':
                                            return (
                                                <TopWidget
                                                    onSelectArtist={handleArtistSelect}
                                                    onSelectTrack={handleTrackSelect}
                                                    selectedArtists={selectedArtists}
                                                    selectedTracks={selectedTracks}
                                                    onLimitError={setLimitError}
                                                />
                                            );
                                        case 'decade':
                                            return <DecadeWidget onSelect={handleTrackSelect} selectedItems={selectedTracks} />;
                                        case 'popularity':
                                            return <PopularityWidget onSelect={setPopularityRange} selectedRange={popularityRange} />;
                                        default:
                                            return null;
                                    }
                                })()}
                            </WidgetWrapper>
                        );
                    })}
                </CursorBlob>
            )}

            {/* Create Playlist Button */}
            <SpotifyBtn
                onClick={handleCreatePlaylist}
                disabled={!canCreatePlaylist || isCreatingPlaylist}
                className="w-full my-4 bg-spotify-green text-white hover:bg-spotify-green-light flex items-center justify-center"
            >
                {isCreatingPlaylist ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Creando playlist...
                    </>
                ) : (
                    <>
                        <ListMusic className="w-5 h-5 mr-2" />
                        Crear Playlist en Spotify ({tracksInRange.length} canciones)
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                )}
            </SpotifyBtn>

            {/* Playlist and Favorites side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <PlaylistPanel
                    tracks={selectedTracks}
                    onRemoveTrack={removeTrack}
                    popularityRange={popularityRange}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />
                <FavoritesPanel
                    favorites={favorites}
                    onAddToPlaylist={addFavoriteToPlaylist}
                    onRemoveFavorite={removeFavorite}
                />
            </div>

            <WidgetLimitPopup message={limitError} onClose={() => setLimitError(null)} duration={4000} />
        </main>
    )
}