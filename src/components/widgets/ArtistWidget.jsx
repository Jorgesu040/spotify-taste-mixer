'use client'

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import { fetchSearchArtist } from "@/lib/spotifyFetch"
import ArtistItem from "@/components/widgets/items/ArtistItem"
import TextSpanWrapper from "@/components/TextSpanWrapper"
import { Search, User } from "lucide-react"

import { motion } from "motion/react"

export default function ArtistWidget({ onSelect, selectedItems = [], className, maxItems = 5, onLimitError }) {

    const [response, setResponse] = useState([])
    const items = Array.isArray(selectedItems) ? selectedItems : []
    const isSelected = (id) => items.find(artist => artist.id === id) !== undefined
    const canAddMore = items.length < maxItems

    const handleSelect = (artist) => {
        // Case 1: deselecting
        if (isSelected(artist.id)) {
            const newSelected = items.filter(item => item.id !== artist.id)
            onSelect(newSelected)
            return
            // Case 2: selecting
        } else if (canAddMore) {
            const newSelected = [...items, artist]
            onSelect(newSelected)
        } else {
            // show popup notification for limit
            if (onLimitError) onLimitError(`Puedes seleccionar hasta ${maxItems} artistas.`)
        }
    }

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    return (
        <section className={`w-full h-full min-h-[500px] flex flex-col bg-spotify-gray-dark rounded-lg p-4 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <TextSpanWrapper makeSmall>Artistas</TextSpanWrapper>
                <User className="text-spotify-gray-light" size={20} />
            </div>

            <SearchBar
                persistKey="artist-query"
                setResponse={setResponse}
                fnToCall={fetchSearchArtist}
            />

            <div className="flex-1 flex flex-col">
                {response.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-spotify-gray-light">
                        <Search size={48} className="opacity-50 mb-2" />
                        <p>Escribe para buscar</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 max-h-[350px] overflow-y-auto p-2"
                    >
                        {response.map((item) => (
                            <ArtistItem key={item.id} onSelect={handleSelect} isSelected={isSelected(item.id)}>{item}</ArtistItem>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}