'use client'

import { useMemo, useState } from 'react'
import SearchBar from '@/components/SearchBar'
import Fuse from 'fuse.js'
import generes from '@/generes/generes.json'
import GenreItem from './items/GenreItem'

export default function GenreWidget({ onSelect, selectedItems, className, maxItems = 5 }) {
    const [response, setResponse] = useState([])
    
    // selectedItems is an array of genre strings (e.g. ["pop", "rock"])
    const items = Array.isArray(selectedItems) ? selectedItems : []
    const isSelected = (genre) => items.includes(genre)
    const canAddMore = items.length < maxItems

    const handleSelect = (genre) => {
        // Case 1: deselecting
        if (isSelected(genre)) {
            const newSelected = items.filter(g => g !== genre)
            onSelect(newSelected)
            return
        // Case 2: selecting
        } else if (canAddMore) {
            const newSelected = [...items, genre]
            onSelect(newSelected)
        } else {
            // TODO: use popup notification system
            alert(`You can select up to ${maxItems} genres.`)
        }
    }


    // generes.json is an array of strings, use Fuse with simple config
    const fuse = useMemo(() => {
        const list = Array.isArray(generes) ? generes : []
        const options = { includeScore: true, threshold: 0.4 }
        return new Fuse(list, options)
    }, [])

    // function passed to SearchBar; returns an array of strings (genre names)
    const fnToCall = async (query) => {
        if (!query) return []
        try {
            const results = fuse.search(query)
            // r.item is already a string from generes.json
            return results.map(r => r.item)
        } catch (e) {
            console.error('Fuse search error', e)
            return []
        }
    }

    return (
        <section className={`w-full bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-foreground font-semibold">Buscar géneros</h2>
            </div>

            <SearchBar
                persistKey="genre-query"
                setResponse={setResponse}
                fnToCall={fnToCall}
            />

            <div className="flex flex-wrap content-start ali gap-2 mt-4 max-h-[400px] min-h-[400px] overflow-y-auto">
                {response.map((genre, idx) => (
                    <GenreItem key={`${genre}-${idx}`} onSelect={() => handleSelect(genre)} isSelected={isSelected(genre)}>
                        {genre}
                    </GenreItem>
                ))}
            </div>
        </section>
    )
}
