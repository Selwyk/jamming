const userId = "116eb6dfbf3b45eb94893215610c5ab1";
//const redirectURI = "http://localhost:3000/";
const redirectURI ="http://calculating-marble.surge.sh/"
let accessToken = null;
const spotifyApiUrl = "https://api.spotify.com/v1";

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const access_token = window.location.href.match(/access_token=([^&]*)/);
      const expire_in = window.location.href.match(/expires_in=([^&]*)/);
      if (access_token && expire_in) {
        accessToken = access_token[1];
        const expiresIn = expire_in[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${userId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
      return accessToken;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`${spotifyApiUrl}/search?type=track&q=${term}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-type': 'application/json'
        }
      }).then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        }
      });
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    let userId = null;

    return fetch(`${spotifyApiUrl}/me`, {
      headers: headers
    }).then(response => response.json()).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`${spotifyApiUrl}/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: playlistName
        })
      }).then(response => response.json()).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`${spotifyApiUrl}/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            uris: trackUris
          })
        });
      });
    });
  }
}
export default Spotify;
