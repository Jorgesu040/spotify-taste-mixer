'use client'

import { Slider } from "@/components/ui/slider"
import { TrendingUp } from "lucide-react"

export default function PopularityWidget({ onSelect, selectedRange = [20, 80], className }) {

    const popularity = Array.isArray(selectedRange) ? selectedRange : [20, 80]

    const handleChange = (value) => {
        onSelect?.(value)
    }

    return (
        <section className={`w-full bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
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
                onValueChange={handleChange}
                min={0}
                max={100}
                step={1}
                className="mb-2"
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