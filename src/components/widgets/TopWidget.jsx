'use client'

import { useState, useEffect } from "react"
import { User, Music } from "lucide-react"
import { fetchUserTopArtists, fetchUserTopTracks } from "@/lib/spotifyFetch"
import SpotifyBtn from "../SpotifyBtn"
import ArtistItem from "./items/ArtistItem"
import TrackItem from "./items/TrackItem"
import TextSpanWrapper from "@/components/TextSpanWrapper"

export default function TopWidget({ onSelectArtist, onSelectTrack, selectedTracks = [], selectedArtists = [], className, maxArtists = 5, maxTracks = 20, onLimitError }) {
    const [activeTab, setActiveTab] = useState('artists') // 'artists' | 'tracks'
    const [timeRange, setTimeRange] = useState('medium_term') // short_term | medium_term | long_term
    const [topArtists, setTopArtists] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [error, setError] = useState(null)

    const timeRangeLabels = [
        { value: 'short_term', label: '4 semanas' },
        { value: 'medium_term', label: '6 meses' },
        { value: 'long_term', label: 'Siempre' }
    ]

    const artists = Array.isArray(selectedArtists) ? selectedArtists : []
    const isArtistSelected = (id) => artists.find(artist => artist.id === id) !== undefined
    const canAddMoreArtists = artists.length < maxArtists

    const tracks = Array.isArray(selectedTracks) ? selectedTracks : []
    const isTrackSelected = (id) => tracks.find(track => track.id === id) !== undefined
    const canAddMoreTracks = tracks.length < maxTracks

    const handleSelectArtist = (artist) => {
        // Case 1: deselecting
        if (isArtistSelected(artist.id)) {
            const newSelected = artists.filter(item => item.id !== artist.id)
            onSelectArtist(newSelected)
            return
            // Case 2: selecting
        } else if (canAddMoreArtists) {
            const newSelected = [...artists, artist]
            onSelectArtist(newSelected)
        } else {
            // show popup notification for limit
            if (onLimitError) onLimitError(`Puedes seleccionar hasta ${maxArtists} artistas.`)
        }
    }

    const handleSelectTrack = (track) => {
        // Case 1: deselecting
        if (isTrackSelected(track.id)) {
            const newSelected = tracks.filter(item => item.id !== track.id)
            onSelectTrack(newSelected)
            return
            // Case 2: selecting
        } else if (canAddMoreTracks) {
            const newSelected = [...tracks, track]
            onSelectTrack(newSelected)
        } else {
            // show popup notification for limit
            if (onLimitError) onLimitError(`Puedes seleccionar hasta ${maxTracks} pistas.`)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            setError(null)
            try {
                if (activeTab === 'artists') {
                    const artists = await fetchUserTopArtists(timeRange, 20)
                    setTopArtists(artists)
                } else {
                    const tracks = await fetchUserTopTracks(timeRange, 20)
                    setTopTracks(tracks)
                }
            } catch (err) {
                setError(err.message)
                console.error('Error fetching top items:', err)
            } finally {
            }
        }

        fetchData()
    }, [activeTab, timeRange])

    return (
        <section className={`w-full h-full min-h-[500px] flex flex-col bg-spotify-gray-dark rounded-lg p-4 ${className ?? ''}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <TextSpanWrapper makeSmall>Tu Top</TextSpanWrapper>
            </div>

            {/* Tabs: Artists / Tracks */}
            <div className="flex gap-2 mb-4">
                <SpotifyBtn
                    onClick={() => setActiveTab('artists')}
                    className={`flex items-center gap-2 ${activeTab === 'artists'
                        ? 'bg-spotify-green text-black'
                        : 'bg-spotify-gray-mid text-foreground hover:bg-spotify-gray-light/20'
                        }`}
                >
                    <User size={16} />
                    Artistas
                </SpotifyBtn>
                <SpotifyBtn
                    onClick={() => setActiveTab('tracks')}
                    className={`flex items-center gap-2 ${activeTab === 'tracks'
                        ? 'bg-spotify-green text-black'
                        : 'bg-spotify-gray-mid text-foreground hover:bg-spotify-gray-light/20'
                        }`}
                >
                    <Music size={16} />
                    Canciones
                </SpotifyBtn>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 mb-4">
                {timeRangeLabels.map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setTimeRange(value)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${timeRange === value
                            ? 'bg-spotify-green/20 text-spotify-green border border-spotify-green'
                            : 'bg-spotify-gray-mid text-spotify-gray-light hover:text-foreground'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Error State */}
            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            {/* Content wrapper */}
            <div className="flex-1 flex flex-col">
                {/* Artists List */}
                {activeTab === 'artists' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto">
                        {topArtists.map((artist, index) => (
                            <ArtistItem
                                key={artist.id}
                                onSelect={handleSelectArtist}
                                isSelected={isArtistSelected(artist.id)}
                                rank={index + 1}
                                showFollowers={false}
                                showGenres={false}
                                size="small"
                                bg="bg-spotify-gray-mid"
                            >
                                {artist}
                            </ArtistItem>
                        ))}
                    </div>
                )}

                {/* Tracks List */}
                {activeTab === 'tracks' && (
                    <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto">
                        {topTracks.map((track, index) => (
                            <TrackItem
                                key={track.id}
                                onSelect={handleSelectTrack}
                                isSelected={isTrackSelected(track.id)}
                                rank={index + 1}
                                showDuration={false}
                                showExplicit={false}
                                bg="bg-spotify-gray-mid"
                            >
                                {track}
                            </TrackItem>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
