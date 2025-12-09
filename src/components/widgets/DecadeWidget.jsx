'use client'

import { useState, useMemo } from "react"
import { Calendar, } from "lucide-react"
import DecadeItem from "./items/DecadeItem"
import SpotifyBtn from "../SpotifyBtn"

export default function DecadeWidget({ onSelect, selectedRange, className }) {
    // Use selectedRange as initial value, then manage locally for editing
    const [startDecade, setStartDecade] = useState(selectedRange.start.toString() ?? "")
    const [endDecade, setEndDecade] = useState(selectedRange.end.toString() ?? "")

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

    const handleApply = () => {

        if (!startDecade) return

        const range = {
            start: parseInt(startDecade),
            end: endDecade ? parseInt(endDecade) : parseInt(startDecade) + 9
        }
        onSelect?.(range)
    }

    return (
        <section className={`w-full bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-foreground font-bold text-xl">Décadas</h2>
                <Calendar className="text-foreground" size={24} />
            </div>

            <div className="flex flex-col gap-4">
                {/* Start Decade Dropdown */}
                <div>
                    <label className="text-foreground text-sm font-medium mb-2 block">
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

                    <label className="text-foreground text-sm font-medium mb-2 block">
                        Década de Fin (Opcional)
                    </label>
                    <DecadeItem
                        value={endDecade}
                        onChange={setEndDecade}
                        decades={availableEndDecades}
                        placeholder="Selecciona una década"
                    />
                </div>

                <SpotifyBtn onClick={handleApply} disabled={!startDecade}>
                    
                    Aplicar Rango
                </SpotifyBtn>
            </div>
        </section>
    )
}