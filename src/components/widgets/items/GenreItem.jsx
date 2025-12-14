'use client'

import { motion } from "motion/react"

export default function GenreItem({ children, onSelect, isSelected }) {
    const text = typeof children === 'string' ? children : String(children)

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 500, damping: 25 }
        }
    }

    return (
        <motion.div
            layout
            variants={itemVariants}
            className={`inline-block hover:shadow-[inset_-5px_-10px_10px_-5px_rgba(128,128,128,0.3)] backdrop-blur-md bg-spotify-gray-darker/50 text-white rounded-md px-3 py-2 transition ease-in-out duration-200 cursor-pointer ${isSelected ? 'ring-2 ring-spotify-green' : ''}`}
            onClick={onSelect}
        >
            {text}
        </motion.div>
    )
}