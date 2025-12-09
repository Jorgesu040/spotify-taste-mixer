import { getAccessToken, saveTokens } from './auth'


export async function fetchSearchArtist(artist) {

  const url = `https://api.spotify.com/v1/search?type=artist&q=${artist}`

  const artistSearchResponse = await spotifyRequest(url)

  console.log(artistSearchResponse)

  return artistSearchResponse.artists.items

}


export async function fetchSearchTrack(track) {

  const url = `https://api.spotify.com/v1/search?type=track&q=${track}`

  const trackSearchResponse = await spotifyRequest(url)

  console.log(trackSearchResponse)

  return trackSearchResponse.tracks.items

}

export async function fetchArtistTopTracks(artist) {

  const url = `https://api.spotify.com/v1/artists/${artist}/top-tracks`

  const artistTopTracks = await spotifyRequest(url)

  console.log(artistTopTracks)

  return artistTopTracks.tracks
}


export async function fetchSearchTracksByYear(startYear, endYear = null, limit = 20) {
  const yearQuery = endYear ? `${startYear}-${endYear}` : `${startYear}`
  const url = `https://api.spotify.com/v1/search?type=track&q=year:${yearQuery}&limit=${limit}`
  const trackSearchResponse = await spotifyRequest(url)
  console.log(trackSearchResponse)
  return trackSearchResponse.tracks.items
}


// Fetch current user profile
export async function fetchCurrentUserProfile() {
  const url = 'https://api.spotify.com/v1/me'
  const userProfile = await spotifyRequest(url)
  return userProfile
}


// Create a new playlist for the current user
export async function createPlaylist(name, description = '', isPublic = true) {
  const user = await fetchCurrentUserProfile()
  const url = `https://api.spotify.com/v1/users/${user.id}/playlists`

  const response = await spotifyRequestPost(url, {
    name,
    description,
    public: isPublic
  })

  return response
}


// Add tracks to a playlist
export async function addTracksToPlaylist(playlistId, trackUris) {
  // Spotify allows max 100 tracks per request
  const chunks = []
  for (let i = 0; i < trackUris.length; i += 100) {
    chunks.push(trackUris.slice(i, i + 100))
  }

  for (const chunk of chunks) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    await spotifyRequestPost(url, { uris: chunk })
  }
}


// Create playlist and add tracks, returns playlist URL
export async function createPlaylistWithTracks(name, tracks, description = '') {
  // Filter tracks within popularity range if needed (already filtered in UI)
  const trackUris = tracks.map(track => track.uri).filter(Boolean)

  if (trackUris.length === 0) {
    throw new Error('No hay canciones válidas para crear la playlist')
  }

  // Create the playlist
  const playlist = await createPlaylist(name, description, true)

  // Add tracks to the playlist
  await addTracksToPlaylist(playlist.id, trackUris)

  // Return the playlist external URL
  return playlist.external_urls.spotify
}


// Fetch user profile by ID
export async function fetchUserProfile(userId) {
  const url = `https://api.spotify.com/v1/users/${userId}`
  const userProfile = await spotifyRequest(url)
  return userProfile
}


// Fetch user's top artists
// timeRange: 'short_term' (4 weeks), 'medium_term' (6 months), 'long_term' (all time)
export async function fetchUserTopArtists(timeRange = 'medium_term', limit = 20) {
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`
  const response = await spotifyRequest(url)
  return response.items
}


// Fetch user's top tracks
// timeRange: 'short_term' (4 weeks), 'medium_term' (6 months), 'long_term' (all time)
export async function fetchUserTopTracks(timeRange = 'medium_term', limit = 20) {
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`
  const response = await spotifyRequest(url)
  return response.items
}


// Fetch top tracks by genre
export async function fetchTopTracksByGenre(genre, limit = 5) {
  // Search for tracks with this genre, sorted by popularity (implied by search usually)
  const url = `https://api.spotify.com/v1/search?type=track&q=genre:${encodeURIComponent(genre)}&limit=${limit}`
  const response = await spotifyRequest(url)
  console.log(`Top tracks for genre ${genre}:`, response)
  return response.tracks.items
}


// Helper function 
async function spotifyRequest(url) {
  // Get current token and try to refresh if missing or expired
  let token = getAccessToken();

  async function refreshAccessToken() {
    try {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('spotify_refresh_token') : null;
      if (!refreshToken) return null;

      const res = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      });

      if (!res.ok) return null;

      const data = await res.json();
      const accessToken = data.access_token;
      const expiresIn = data.expires_in;

      // Save the new access token (keep existing refresh token)
      saveTokens(accessToken, refreshToken, expiresIn);

      return accessToken;
    } catch (err) {
      console.error('Error refreshing access token:', err);
      return null;
    }
  }

  if (!token) {
    token = await refreshAccessToken();
    if (!token) {
      window.location.href = '/';
      return;
    }
  }

  // Helper to perform request with provided token
  const doRequest = (t) => fetch(url, { headers: { 'Authorization': `Bearer ${t}` } });

  let response = await doRequest(token);

  // If unauthorized, try refreshing token once and retry
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      window.location.href = '/';
      return;
    }
    response = await doRequest(newToken);
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}


// Helper function for POST requests
async function spotifyRequestPost(url, body) {
  let token = getAccessToken();

  async function refreshAccessToken() {
    try {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('spotify_refresh_token') : null;
      if (!refreshToken) return null;

      const res = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      });

      if (!res.ok) return null;

      const data = await res.json();
      const accessToken = data.access_token;
      const expiresIn = data.expires_in;

      saveTokens(accessToken, refreshToken, expiresIn);

      return accessToken;
    } catch (err) {
      console.error('Error refreshing access token:', err);
      return null;
    }
  }

  if (!token) {
    token = await refreshAccessToken();
    if (!token) {
      window.location.href = '/';
      return;
    }
  }

  const doRequest = (t) => fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${t}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  let response = await doRequest(token);

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      window.location.href = '/';
      return;
    }
    response = await doRequest(newToken);
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}