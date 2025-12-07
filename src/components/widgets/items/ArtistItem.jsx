'use client'


import Image from "next/image"

export default function ArtistItem({ children }) {
    const artist = children

    return (
        <div className="flex flex-col items-center p-4 rounded-lg bg-spotify-gray-dark hover:bg-spotify-gray-mid transition-colors cursor-pointer">
            {artist.images?.[0]?.url ? (
                <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                    <Image 
                        src={artist.images[0].url} 
                        alt={artist.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-spotify-gray-mid flex items-center justify-center">
                    <span className="text-spotify-gray-light text-4xl">?</span>
                </div>
            )}
            
            <h2 className="mt-3 text-foreground font-semibold text-center truncate w-full">
                {artist.name}
            </h2>
            
            <p className="text-spotify-gray-light text-sm">
                {artist.followers?.total?.toLocaleString()} followers
            </p>
            
            {artist.genres?.length > 0 && (
                <p className="text-spotify-green text-xs mt-1 truncate w-full text-center">
                    {artist.genres.slice(0, 2).join(', ')}
                </p>
            )}
        </div>
    )
}