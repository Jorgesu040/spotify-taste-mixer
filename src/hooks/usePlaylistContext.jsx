import { useState } from 'react'

export function usePlaylistContext() {
  const [selectedTracks, setSelectedTracks] = useState([])
  const [selectedArtists, setSelectedArtists] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])


  const statesArray = [selectedTracks, selectedArtists, selectedGenres]
  const settersArray = [ setSelectedTracks, setSelectedArtists, setSelectedGenres ]

  return [statesArray, settersArray]
}
