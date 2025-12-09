'use client'

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import { fetchSearchTrack } from "@/lib/spotifyFetch"
import TrackItem from "@/components/widgets/items/TrackItem"

export default function TrackWidget({ onSelect, selectedItems = [], className, maxItems = 20 }) {

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
            // TODO: use popup notification system
            alert(`You can select up to ${maxItems} tracks.`)
        }
    }

    return (
        <section className={`w-full bg-spotify-gray-dark rounded-lg p-4 ${className} `}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-foreground font-semibold">Buscar pistas</h2>
            </div>

            <SearchBar
                persistKey="track-query"
                setResponse={setResponse}
                fnToCall={fetchSearchTrack}
            />

            <div className="grid grid-cols-1   gap-2 mt-4 max-h-[400px] overflow-y-auto">
                {response.map((item) => (
                    <TrackItem key={item.id} onSelect={handleSelect} isSelected={isSelected(item.id)}>{item}</TrackItem>
                ))}
            </div>
        </section>
    )
}