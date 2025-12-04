'use client'

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import { fetchSearchTrack } from "@/lib/spotifyFetch"
import TrackItem from "@/components/widgets/items/TrackItem"

export default function TrackWidget({ onSelect, selectedItems, className }) {

    const [response, setResponse] = useState([])


    return (
        <section className={`bg-spotify-gray-dark rounded-lg p-4 ${className} `}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-foreground font-semibold">Buscar pistas</h2>
            </div>

            <SearchBar
                persistKey="track-query"
                setResponse={setResponse}
                fnToCall={fetchSearchTrack}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-4 max-h-[400px] overflow-y-auto">
                {response.map((item) => (
                    <TrackItem key={item.id}>{item}</TrackItem>
                ))}
            </div>
        </section>
    )
}