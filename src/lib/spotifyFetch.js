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

export async function fetchArtistTopTracks(artist, market = 'ES') {

  const url = `https://api.spotify.com/v1/artists/${artist}/top-tracks?market=${market}`
  
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


// Fetch user profile by ID
export async function fetchUserProfile(userId) {
  const url = `https://api.spotify.com/v1/users/${userId}`
  const userProfile = await spotifyRequest(url)
  return userProfile
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