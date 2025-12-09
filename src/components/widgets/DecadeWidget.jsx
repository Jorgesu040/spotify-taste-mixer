'use client'

import { useState, useMemo, useCallback, useEffect } from "react"
import { Calendar, Search } from "lucide-react"
import DecadeItem from "./items/DecadeItem"
import TrackItem from "./items/TrackItem"
import { fetchSearchTracksByYear } from "@/lib/spotifyFetch"
import TextSpanWrapper from "@/components/TextSpanWrapper"

export default function DecadeWidget({ onSelect, selectedItems = [], className }) {
    const [startDecade, setStartDecade] = useState("")
    const [endDecade, setEndDecade] = useState("")
    const [results, setResults] = useState([])

    // Generate decades from 1900 to current decade
    const decades = useMemo(() => {
        const currentYear = new Date().getFullYear()
        const currentDecade = Math.floor(currentYear / 10) * 10
        const result = []
        for (let decade = 1900; decade <= currentDecade; decade += 10) {
            result.push(decade)
        }
        return result
    }, [])

    const availableEndDecades = useMemo(() =>
        startDecade ? decades.filter(d => d >= parseInt(startDecade)) : decades,
        [decades, startDecade]
    )

    // Search when startDecade changes
    useEffect(() => {
        if (!startDecade) return

        const search = async () => {
            try {
                const startYear = parseInt(startDecade)
                const endYear = endDecade ? parseInt(endDecade) + 9 : startYear + 9
                const tracks = await fetchSearchTracksByYear(startYear, endYear, 20)
                setResults(tracks || [])
            } catch (error) {
                console.error('Error fetching tracks by year:', error)
                setResults([])
            }
        }

        search()
    }, [startDecade, endDecade])

    const handleSelectTrack = (track) => {
        const exists = Array.isArray(selectedItems) && selectedItems.find(t => t.id === track.id)
        if (exists) {
            onSelect?.(selectedItems.filter(t => t.id !== track.id))
        } else {
            onSelect?.([...selectedItems, track])
        }
    }

    const isSelected = (trackId) => Array.isArray(selectedItems) && selectedItems.some(t => t.id === trackId)

    return (
        <section className={`w-full h-full min-h-[500px] flex flex-col bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            <div className="flex justify-between items-center mb-4">
                <TextSpanWrapper makeSmall>Décadas</TextSpanWrapper>
                <Calendar className="text-spotify-gray-light" size={20} />
            </div>

            <div className="flex flex-col gap-3">
                {/* Start Decade Dropdown */}
                <div>
                    <label className="text-foreground text-sm font-medium mb-1 block">
                        Década de Inicio
                    </label>
                    <DecadeItem
                        value={startDecade}
                        onChange={setStartDecade}
                        decades={decades}
                        placeholder="Selecciona una década"
                    />
                </div>

                {/* End Decade Dropdown */}
                <div>
                    <label className="text-foreground text-sm font-medium mb-1 block">
                        Década de Fin (Opcional)
                    </label>
                    <DecadeItem
                        value={endDecade}
                        onChange={setEndDecade}
                        decades={availableEndDecades}
                        placeholder="Selecciona una década"
                    />
                </div>
            </div>

            {/* Results or empty state */}
            <div className="flex-1 flex flex-col mt-4">
                {results.length > 0 ? (
                    <div className="space-y-2 max-h-[250px] overflow-y-auto p-2">
                        {results.map(track => (
                            <TrackItem
                                key={track.id}
                                onSelect={handleSelectTrack}
                                isSelected={isSelected(track.id)}
                                bg="bg-spotify-gray-mid"
                            >
                                {track}
                            </TrackItem>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-spotify-gray-light">
                        <Search size={48} className="opacity-50 mb-2" />
                        <p>Selecciona una década</p>
                    </div>
                )}
            </div>
        </section>
    )
}