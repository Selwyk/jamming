const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/';
let accessToken = null;
const spotifyApiUrl = 'https://api.spotify.com/v1';

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiryMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiryMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiryMatch[1]);
      window.setTimeout(() => { accessToken = ''; }, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    if (!clientId) {
      console.error('REACT_APP_SPOTIFY_CLIENT_ID is not set. Check your .env.local file.');
      return null;
    }
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(redirectURI)}`;
    return null;
  },

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`${spotifyApiUrl}/search?type=track&q=${encodeURIComponent(term)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Spotify search failed: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      })
      .catch(error => {
        console.error('Error searching Spotify:', error);
        return [];
      });
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris || !trackUris.length) {
      return Promise.resolve();
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    return fetch(`${spotifyApiUrl}/me`, { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonResponse => {
        const userId = jsonResponse.id;
        return fetch(`${spotifyApiUrl}/users/${userId}/playlists`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ name: playlistName })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to create playlist: ${response.status}`);
            }
            return response.json();
          })
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`${spotifyApiUrl}/users/${userId}/playlists/${playlistId}/tracks`, {
              headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris })
            });
          });
      })
      .catch(error => {
        console.error('Error saving playlist:', error);
      });
  }
};

export default Spotify;
