'use client'

import { useState } from "react"
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
import { usePlaylistContext } from "@/hooks/usePlaylistContext"
import { useFilter } from "@/hooks/useFilter"

export default function Dashboard() {

    const [ [selectedTracks, selectedArtists, selectedGenres], [setSelectedTracks, setSelectedArtists, setSelectedGenres] ] = usePlaylistContext()
    const [ [popularityRange], [setPopularityRange] ] = useFilter()
    const [limitError, setLimitError] = useState(null)

    // Remove a track from the playlist
    const removeTrack = (trackId) => {
        setSelectedTracks(prev => prev.filter(t => t.id !== trackId))
    }

    // Add a favorite track to the playlist
    const addFavoriteToPlaylist = (track) => {
        setSelectedTracks(prev => {
            if (prev.find(t => t.id === track.id)) return prev
            return [...prev, track]
        })
    }


    return (
        <main className="min-h-screen bg-spotify-gray-darker p-2 sm:p-4 md:p-6 lg:p-8">

            {/* Widgets grid - 4 columns */}
            <CursorBlob  className=" p-4 shadow-[inset_-5px_-10px_30px_-10px_rgba(128,128,128,0.5)] backdrop-blur-md rounded-lg grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 items-stretch bg-accent/50">
                <WidgetWrapper cols={1} storageKey="widget-artist-cols">
                    <ArtistWidget onSelect={setSelectedArtists} selectedItems={selectedArtists} onLimitError={setLimitError}/>
                </WidgetWrapper>

                <WidgetWrapper cols={1} storageKey="widget-track-cols">
                    <TrackWidget onSelect={setSelectedTracks} selectedItems={selectedTracks} onLimitError={setLimitError}/>
                </WidgetWrapper>

                <WidgetWrapper cols={1} storageKey="widget-genre-cols">
                    <GenreWidget onSelect={setSelectedGenres} selectedItems={selectedGenres} onLimitError={setLimitError}/>
                </WidgetWrapper>

                <WidgetWrapper cols={3} storageKey="widget-top-cols">
                    <TopWidget 
                        onSelectArtist={setSelectedArtists} 
                        onSelectTrack={setSelectedTracks}
                        selectedArtists={selectedArtists}
                        selectedTracks={selectedTracks}
                        onLimitError={setLimitError}
                    />
                </WidgetWrapper>

                <WidgetWrapper cols={2} storageKey="widget-decade-cols">
                    <DecadeWidget onSelect={setSelectedTracks} selectedItems={selectedTracks} />
                </WidgetWrapper>

                <WidgetWrapper cols={1} storageKey="widget-popularity-cols">
                    <PopularityWidget onSelect={setPopularityRange} selectedRange={popularityRange} />
                </WidgetWrapper>
            </CursorBlob>

            {/* Playlist and Favorites side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <PlaylistPanel 
                    tracks={selectedTracks}
                    onRemoveTrack={removeTrack}
                />
                <FavoritesPanel 
                    onAddToPlaylist={addFavoriteToPlaylist}
                />
            </div>

            <WidgetLimitPopup message={limitError} onClose={() => setLimitError(null)} duration={4000} />
        </main>
    )
}