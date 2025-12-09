'use client'

import { Slider } from "@/components/ui/slider"
import { TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function PopularityWidget({ onChange, selectedRange, className, debounceMs = 300 }) {

    const persistKey = 'popularity-range'

    const [popularity, setPopularity] = useState(() => {
        try {
            const saved = localStorage.getItem(persistKey)
            return saved ? JSON.parse(saved) : [20, 80]
        } catch { 
            return [20, 80]
        }
    });

    useEffect(() => {
        try {
            const saved = localStorage.getItem(persistKey)
            if (saved) {
                const parsed = JSON.parse(saved)
            }
        } catch (e) {
            console.error('Error loading persisted popularity value', e)
        }
    }, [])


    // debounce: llama fnToCall y guarda en localStorage tras debounceMs
    useEffect(() => {
        const id = setTimeout(async () => {

            try {
                localStorage.setItem(persistKey, JSON.stringify(popularity))
            } catch (e) {
                console.error('Error saving persisted search value', e)
            }

        }, debounceMs)

        return () => clearTimeout(id)
    }, [popularity, debounceMs])


    return (
        <section className={`w-full bg-spotify-gray-dark rounded-lg p-4 ${className}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-foreground font-semibold">Popularity</h2>
                <TrendingUp className="text-spotify-gray-light" size={18} />
            </div>

            <p className="text-spotify-gray-light text-sm mb-4">
                De las canciones selecionadas, filtra por popularidad:
            </p>

            {/* Range slider */}
            <Slider
                value={popularity}
                onValueChange={setPopularity}
                min={0}
                max={100}
                step={1}
                className="mb-2 color-"
            />

            {/* Labels */}
            <div className="flex justify-between text-xs text-spotify-gray-light">
                <span>Joyas ocultas</span>
                <span>Éxitos virales</span>
            </div>

            {/* Current values */}
            <p className="text-center text-spotify-green text-sm mt-2">
                {popularity ? `${popularity[0]} - ${popularity[1]}` : "No hay rango de popularidad seleccionado"}
            </p>
        </section>
    )
}