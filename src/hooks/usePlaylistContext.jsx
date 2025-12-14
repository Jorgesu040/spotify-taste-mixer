import { useState, useRef } from 'react'
import { fetchArtistTopTracks, fetchTopTracksByGenre } from '@/lib/spotifyFetch'

export function usePlaylistContext() {
  const [selectedTracks, setSelectedTracks] = useState([])
  const [selectedArtists, setSelectedArtists] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [isLoadingTracks, setIsLoadingTracks] = useState(false)

  // Track previous artists/genres to detect additions/removals
  const prevArtistsRef = useRef([])
  const prevGenresRef = useRef([])

  // Handle artist selection - fetch top tracks for new artists
  const handleArtistSelect = async (newArtists) => {
    setIsLoadingTracks(true)
    const previousArtists = prevArtistsRef.current
    const addedArtists = newArtists.filter(artist => !previousArtists.find(prevArtist => prevArtist.id === artist.id))
    const removedArtistIds = previousArtists.filter(prevArtist => !newArtists.find(artist => artist.id === prevArtist.id)).map(removed => removed.id)

    prevArtistsRef.current = newArtists
    setSelectedArtists(newArtists)

    // Remove tracks from removed artists
    if (removedArtistIds.length > 0) {
      setSelectedTracks(prevTracks => prevTracks.filter(track =>
        !track.source || track.source.type !== 'artist' || !removedArtistIds.includes(track.source.id)
      ))
    }

    // Add top tracks for each new artist
    for (const artist of addedArtists) {
      try {
        const topTracks = await fetchArtistTopTracks(artist.id)
        const tracksWithSource = topTracks.slice(0, 5).map(track => ({
          ...track,
          source: { type: 'artist', name: artist.name, id: artist.id }
        }))
        setSelectedTracks(prevTracks => {
          const existingIds = new Set(prevTracks.map(existing => existing.id))
          const newTracks = tracksWithSource.filter(candidate => !existingIds.has(candidate.id))
          return [...prevTracks, ...newTracks]
        })
      } catch (error) {
        console.error(`Error fetching top tracks for ${artist.name}:`, error)
      }
    }
    setIsLoadingTracks(false)
  }

  // Handle genre selection - fetch top tracks for new genres
  const handleGenreSelect = async (newGenres) => {
    setIsLoadingTracks(true)
    const previousGenres = prevGenresRef.current
    const addedGenres = newGenres.filter(genre => !previousGenres.includes(genre))
    const removedGenres = previousGenres.filter(prevGenre => !newGenres.includes(prevGenre))

    prevGenresRef.current = newGenres
    setSelectedGenres(newGenres)

    // Remove tracks from removed genres
    if (removedGenres.length > 0) {
      setSelectedTracks(prevTracks => prevTracks.filter(track =>
        !track.source || track.source.type !== 'genre' || !removedGenres.includes(track.source.name)
      ))
    }

    // Add top tracks for each new genre
    for (const genre of addedGenres) {
      try {
        const topTracks = await fetchTopTracksByGenre(genre, 5)
        const tracksWithSource = topTracks.map(track => ({
          ...track,
          source: { type: 'genre', name: genre }
        }))
        setSelectedTracks(prevTracks => {
          const existingIds = new Set(prevTracks.map(existing => existing.id))
          const newTracks = tracksWithSource.filter(candidate => !existingIds.has(candidate.id))
          return [...prevTracks, ...newTracks]
        })
      } catch (error) {
        console.error(`Error fetching top tracks for genre ${genre}:`, error)
      }
    }
    setIsLoadingTracks(false)
  }

  // Handle direct track selection (from TrackWidget/search)
  const handleTrackSelect = (newTracks) => {
    const tracksWithSource = newTracks.map(candidate =>
      candidate.source ? candidate : { ...candidate, source: { type: 'search', name: 'Búsqueda' } }
    )
    setSelectedTracks(tracksWithSource)
  }

  // Remove a track from the playlist
  const removeTrack = (trackId) => {
    setSelectedTracks(prevTracks => prevTracks.filter(track => track.id !== trackId))
  }

  // Add a favorite track to the playlist
  const addFavoriteToPlaylist = (track) => {
    setSelectedTracks(prevTracks => {
      if (prevTracks.find(existing => existing.id === track.id)) return prevTracks
      return [...prevTracks, { ...track, source: { type: 'favorite', name: 'Favoritos' } }]
    })
  }
  // Add tracks from playlist import
  const addTracksToPlaylist = (newTracks) => {
    setSelectedTracks(prevTracks => {
      const existingIds = new Set(prevTracks.map(t => t.id))
      const uniqueNew = newTracks.filter(t => !existingIds.has(t.id)).map(t => ({
        ...t,
        source: { type: 'import', name: 'Playlist Importada' }
      }))
      return [...prevTracks, ...uniqueNew]
    })
  }

  return {
    // States
    selectedTracks,
    selectedArtists,
    selectedGenres,
    isLoadingTracks,
    // Handlers
    handleArtistSelect,
    handleGenreSelect,
    handleTrackSelect,
    removeTrack,
    addFavoriteToPlaylist,
    addTracksToPlaylist,
  }
}
