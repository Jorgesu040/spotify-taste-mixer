'use client'

import Image from "next/image"
import { User } from "lucide-react"
import InfoButton from "@/components/InfoButton"
import { motion } from "motion/react"

export default function ArtistItem({
    children,
    onSelect,
    isSelected,
    rank,
    showFollowers = true,
    showGenres = true,
    size = 'large',
    bg = 'bg-spotify-gray-dark'
}) {
    const artist = children

    const isSmall = size === 'small'
    const imageSize = isSmall ? 64 : 150
    const imageSizeClass = isSmall ? 'w-16 h-16' : 'w-[150px] h-[150px]'
    const paddingClass = isSmall ? 'p-3' : 'p-4'

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", bounce: 0.2, duration: 0.2 }
        }
    }

    return (
        <motion.div
            layout
            variants={itemVariants}
            className={`flex flex-col items-center ${paddingClass} rounded-lg ${bg} hover:bg-spotify-gray-mid transition-colors cursor-pointer group ${isSelected ? 'ring-2 ring-spotify-green' : ''}`}
            onClick={() => onSelect(artist)}
        >
            {/* Imagen con badge de rango opcional para TopWidget */}
            <div className="relative">
                {rank && (
                    <span className="absolute -top-1 -left-1 bg-spotify-green text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center z-10">
                        {rank}
                    </span>
                )}
                {artist.images?.[0]?.url ? (
                    <div className={`${imageSizeClass} rounded-full overflow-hidden`}>
                        <Image
                            src={artist.images[0].url}
                            alt={artist.name}
                            width={imageSize}
                            height={imageSize}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ) : (
                    <div className={`${imageSizeClass} rounded-full bg-spotify-gray-mid flex items-center justify-center`}>
                        <User size={isSmall ? 24 : 48} className="text-spotify-gray-light" />
                    </div>
                )}
                <div className={`absolute bottom-0 right-0 z-20 ${isSmall ? 'p-2' : 'p-4'}`}>
                    <InfoButton makeSmall={isSmall} item={artist} className="text-white bg-black/60 hover:bg-black/80 shadow-lg" />
                </div>
            </div>

            <h2 className={`mt-${isSmall ? '2' : '3'} text-foreground font-semibold text-center truncate w-full ${isSmall ? 'text-xs' : ''}`}>
                {artist.name}
            </h2>

            {showFollowers && artist.followers?.total != null && (
                <p className="text-spotify-gray-light text-sm">
                    {artist.followers.total.toLocaleString()} followers
                </p>
            )}

            {showGenres && artist.genres?.length > 0 && (
                <p className="text-spotify-green text-xs mt-1 truncate w-full text-center">
                    {artist.genres.slice(0, 2).join(', ')}
                </p>
            )}
        </motion.div>
    )
}