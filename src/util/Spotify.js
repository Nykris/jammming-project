
const clientId = '17f515fb34654342a02df3e2b8943b18'; // insert client ID anywhere
const redirectUri = 'http://localhost:3000/'; /* Have to add this to your accepted Spotify redirect
URIs on the Spotify API. */

let accessToken;

const Spotify = {
  getAccessToken() {
    //GET 'https://accounts.spotify.com/authorize';

    if(accessToken) {
      return accessToken;
    }
    /* make a variable here that saves the access token from the browser url,
    using the .match method*/
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    /* make a variable here that saves the expiration time from the browser url,
    using the .match method */
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    /* if these two variables */
    if(accessTokenMatch && expiresInMatch){
      //save the access token into a variable
      accessToken = accessTokenMatch[1];
      //convert the time of expiration into a number and save it into a variable
      const expiresIn = Number(expiresInMatch[1]);

      //clear the parameters, allowing us to grab a new access token when
      //it expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      //return the variable you made to store the access access token
      return accessToken;
    } else {
      /* make a variable that saves the url for authorization including the
      client id, the response type, the scope, and the redirect uri.
      make window.location = to that variable */
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }

  }, // end getAccessToken()

  search(term) {
    // I don't know if the instructions ever said to do the line below
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    // end of return return below
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      })
      ); // end .map() on the jsonResponse
    }); // end 2nd then()
  },

  savePlaylist(name, trackUris) {
    if(!name || !trackUris.length){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          {headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
    }

}; // end Spotify object

export default Spotify;
