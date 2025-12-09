'use client'

import { useMemo, useState } from 'react'
import SearchBar from '@/components/SearchBar'
import Fuse from 'fuse.js'
import generes from '@/generes/generes.json'
import GenreItem from './items/GenreItem'
import TextSpanWrapper from '@/components/TextSpanWrapper'
import { Search, Palette } from 'lucide-react'

export default function GenreWidget({ onSelect, selectedItems, className, maxItems = 5, onLimitError }) {
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
            // show popup notification for limit
            if (onLimitError) onLimitError(`Puedes seleccionar hasta ${maxItems} géneros.`)
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
        <section className={`w-full h-full min-h-[500px] flex flex-col bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            <div className="flex justify-between items-center mb-4">
                <TextSpanWrapper makeSmall>Géneros</TextSpanWrapper>
                <Palette className="text-spotify-gray-light" size={20} />
            </div>

            <SearchBar
                persistKey="genre-query"
                setResponse={setResponse}
                fnToCall={fnToCall}
            />

            <div className="flex-1 flex flex-col">
                {response.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-spotify-gray-light">
                        <Search size={48} className="opacity-50 mb-2" />
                        <p>Escribe para buscar</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap content-start gap-2 mt-4 max-h-[350px] overflow-y-auto p-2">
                        {response.map((genre, idx) => (
                            <GenreItem key={`${genre}-${idx}`} onSelect={() => handleSelect(genre)} isSelected={isSelected(genre)}>
                                {genre}
                            </GenreItem>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
