'use client'

import { useMemo, useState } from 'react'
import SearchBar from '@/components/SearchBar'
import Fuse from 'fuse.js'
import generes from '@/generes/generes.json'
import GenreItem from './items/GenreItem'

export default function GenreWidget({ onSelect, selectedItems, className }) {
    const [response, setResponse] = useState([])

    // generes.json is always the same shape (array), use simple Fuse options
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
            return results.map(r => {
                const item = r.item
                return typeof item === 'string' ? item : (item.name ?? String(item))
            })
        } catch (e) {
            console.error('Fuse search error', e)
            return []
        }
    }

    return (
        <section className={`bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-foreground font-semibold">Buscar géneros</h2>
            </div>

            <SearchBar
                persistKey="genre-query"
                setResponse={setResponse}
                fnToCall={fnToCall}
            />

            <div className="flex flex-wrap content-start ali gap-2 mt-4 max-h-[400px] min-h-[400px] overflow-y-auto">
                {response.map((text, idx) => (
                    <GenreItem key={`${text}-${idx}`} onClick={() => onSelect?.(text)}>
                        {text}
                    </GenreItem>
                ))}
            </div>
        </section>
    )
}
