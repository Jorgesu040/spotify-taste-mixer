'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { motion } from 'motion/react'
import { X, Music2, Disc, User, Calendar, Star, Mic2, Globe, Clock, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import TextSpanWrapper from '@/components/TextSpanWrapper'
import SpotifyBtn from '@/components/SpotifyBtn'

function formatDuration(ms) {
    if (!ms) return 'N/A'
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const InfoRow = ({ icon: Icon, label, value }) => {
    if (!value) return null
    return (
        <div className="flex items-center gap-3 text-gray-300">
            <div className="w-8 flex justify-center">
                <Icon size={18} className="text-spotify-green" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold">{label}</span>
                <span className="font-medium">{value}</span>
            </div>
        </div>
    )
}

export default function InfoModal({ item, isOpen, onClose }) {
    if (!item) return null

    const isTrack = item.type === 'track'
    const image = isTrack ? item.album?.images?.[0]?.url : item.images?.[0]?.url

    // Track data
    const albumName = item.album?.name
    const artists = item.artists?.map(a => a.name).join(', ')
    const duration = item.duration_ms ? formatDuration(item.duration_ms) : null
    const releaseDate = item.album?.release_date
    const trackNumber = item.track_number

    // Artist data
    const genres = item.genres?.join(', ')
    const followers = item.followers?.total?.toLocaleString()

    // Common data
    const popularity = item.popularity
    const spotifyUrl = item.external_urls?.spotify

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="fixed inset-0 flex items-end md:items-center justify-center md:p-4"
            >
                <DialogPanel className="w-full max-h-[90vh] overflow-y-auto bg-spotify-gray-dark border-t md:border border-white/10 p-6 shadow-2xl rounded-t-2xl md:rounded-2xl md:max-w-4xl relative">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-gray-400 hover:text-white transition-colors z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                        {/* Column 1: Image */}
                        <div className="w-full md:w-80 shrink-0">
                            <div className="aspect-square w-full rounded-xl overflow-hidden shadow-2xl bg-spotify-gray-mid relative">
                                {image ? (
                                    <Image src={image} alt={item.name} layout="fill" objectFit="cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Music2 size={64} className="text-gray-500" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Column 2: Info */}
                        <div className="flex-1 min-w-0">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                    <TextSpanWrapper makeSmall={true}>{item.name}</TextSpanWrapper>
                                </div>
                                <p className="text-spotify-green font-medium flex items-center gap-2 text-lg">
                                    {isTrack ? <Disc size={20} /> : <User size={20} />}
                                    {isTrack ? 'Canción' : 'Artista'}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="space-y-3 mb-8">
                                {isTrack && (
                                    <>
                                        <InfoRow icon={Mic2} label="Artista(s)" value={artists} />
                                        <InfoRow icon={Disc} label="Álbum" value={albumName} />
                                        <InfoRow icon={Calendar} label="Lanzamiento" value={releaseDate} />
                                        <InfoRow icon={Clock} label="Duración" value={duration} />
                                        <InfoRow icon={Clock} label="Pista" value={trackNumber} />
                                        {item.explicit && <InfoRow icon={AlertCircle} label="Contenido" value="Explícito" />}
                                    </>
                                )}

                                {!isTrack && (
                                    <>
                                        <InfoRow icon={Music2} label="Géneros" value={genres} />
                                        <InfoRow icon={User} label="Seguidores" value={followers} />
                                    </>
                                )}

                                <InfoRow icon={Star} label="Popularidad" value={`${popularity}%`} />
                            </div>

                            {/* Abrir en spotify */}
                            {spotifyUrl && (
                                <div className="pt-4 border-t border-white/10">
                                    <SpotifyBtn
                                        onClick={() => window.open(spotifyUrl, '_blank')}
                                        className="w-full md:w-auto bg-spotify-green hover:bg-spotify-green-light text-black font-bold flex items-center justify-center gap-2 hover:scale-105 px-8"
                                    >
                                        <Globe size={18} />
                                        Abrir en Spotify
                                    </SpotifyBtn>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogPanel>
            </motion.div>
        </Dialog>
    )
}
