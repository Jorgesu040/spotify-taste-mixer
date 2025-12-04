'use client'

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import { fetchSearchArtist } from "@/lib/spotifyFetch"
import ArtistItem from "@/components/widgets/items/ArtistItem"

export default function ArtistWidget({ onSelect, selectedItems, className }) {

    const [response, setResponse] = useState([])


    return (
        <section className={`bg-spotify-gray-dark rounded-lg p-4 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-foreground font-semibold">Buscar artistas</h2>
            </div>

            <SearchBar
                persistKey="artist-query"
                setResponse={setResponse}
                fnToCall={fetchSearchArtist}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-4 max-h-[400px] overflow-y-auto">
                {response.map((item) => (
                    <ArtistItem key={item.id}>{item}</ArtistItem>
                ))}
            </div>
        </section>
    )








}