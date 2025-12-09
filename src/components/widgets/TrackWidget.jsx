'use client'

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import { fetchSearchTrack } from "@/lib/spotifyFetch"
import TrackItem from "@/components/widgets/items/TrackItem"
import TextSpanWrapper from "@/components/TextSpanWrapper"
import { Search, Music } from "lucide-react"

export default function TrackWidget({ onSelect, selectedItems = [], className, maxItems = 20, onLimitError }) {

    const [response, setResponse] = useState([])
    const items = Array.isArray(selectedItems) ? selectedItems : []
    const isSelected = (id) => items.find(track => track.id === id) !== undefined
    const canAddMore = items.length < maxItems

    const handleSelect = (track) => {

        // Case 1: deselecting
        if (isSelected(track.id)) {
            const newSelected = items.filter(item => item.id !== track.id)
            onSelect(newSelected)
            return
            // Case 2: selecting
        } else if (canAddMore) {
            const newSelected = [...items, track]
            onSelect(newSelected)
        } else {
            // show popup notification for limit
            if (onLimitError) onLimitError(`Puedes seleccionar hasta ${maxItems} pistas.`)
        }
    }

    return (
        <section className={`w-full h-full min-h-[500px] flex flex-col bg-spotify-gray-dark rounded-lg p-4 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <TextSpanWrapper makeSmall>Pistas</TextSpanWrapper>
                <Music className="text-spotify-gray-light" size={20} />
            </div>

            <SearchBar
                persistKey="track-query"
                setResponse={setResponse}
                fnToCall={fetchSearchTrack}
            />

            <div className="flex-1 flex flex-col">
                {response.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-spotify-gray-light">
                        <Search size={48} className="opacity-50 mb-2" />
                        <p>Escribe para buscar</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2 mt-4 max-h-[350px] overflow-y-auto p-2">
                        {response.map((item) => (
                            <TrackItem key={item.id} onSelect={handleSelect} isSelected={isSelected(item.id)}>{item}</TrackItem>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}