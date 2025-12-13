'use client'

import { useState } from "react"
import { Info } from "lucide-react"
import InfoModal from "@/components/InfoModal"

export default function InfoButton({ item, makeSmall = false, className = "" }) {
    const [isOpen, setIsOpen] = useState(false)

    const size = makeSmall ? 16 : 24
    const paddingClass = makeSmall ? "p-1" : "p-2"

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(true)
                }}
                className={`${paddingClass} hover:text-white hover:bg-white/10 rounded-full transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 ${className}`}
                title="Ver información"
                aria-label="info"
            >
                <Info size={size} />
            </button>
            <InfoModal
                item={item}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}
