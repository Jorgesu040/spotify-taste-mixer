'use client'

import CursorBlob from "@/components/CursorBlob"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import DecadeWidget from "@/components/widgets/DecadeWidget"
import GenreWidget from "@/components/widgets/GenreWidget"
import PopularityWidget from "@/components/widgets/PopularityWidget"
import TopWidget from "@/components/widgets/TopWidget"
import TrackWidget from "@/components/widgets/TrackWidget"
import { usePlaylistContext } from "@/hooks/usePlaylistContext"

export default function Dashboard() {

    const [ [selectedTracks, selectedArtists, selectedGenres], [setSelectedTracks, setSelectedArtists, setSelectedGenres] ] = usePlaylistContext()


    return (
        <main className="min-h-screen bg-spotify-gray-darker p-2 sm:p-4 md:p-6 lg:p-8">

            {/* Widgets grid - 4 columns */}
            <CursorBlob  className=" p-4 shadow-[inset_-5px_-10px_30px_-10px_rgba(128,128,128,0.5)] backdrop-blur-md rounded-lg grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 items-stretch bg-accent/50">
                {/* Each widget card */}
                <div className="relative z-1 w-full">
                    {/* Widget content */}

                    <ArtistWidget onSelect={setSelectedArtists} selectedItems={selectedArtists}/>
                </div>

                <div className="relative z-1 w-full">
                    {/* Widget content */}
                    <TrackWidget onSelect={setSelectedTracks} selectedItems={selectedTracks}/>
                </div>


                <div className="relative z-1 w-full">
                    {/* Widget content */}
                    <GenreWidget onSelect={setSelectedGenres} selectedItems={selectedGenres}/>
                </div>

                <div className="relative z-1 w-full">
                    {/* Widget content */}
                    <TopWidget onSelectArtist={setSelectedArtists} onSelectTrack={setSelectedTracks}/>
                </div>

                <div className="relative z-1 w-full">
                    {/* Widget content */}
                    <DecadeWidget />
                </div>

                <div className="relative z-1 w-full">
                    {/* Widget content */}
                    <PopularityWidget/>
                </div>

            </CursorBlob>



        </main>
    )
}