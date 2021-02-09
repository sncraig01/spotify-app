import querystring from 'querystring';
import { useSession, getSession } from 'next-auth/client'

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });
  return response.json();
};

export const callAPI = async (url, access_token) => {
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
}

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=`;

export const getTopTracks = async (access_token) => {
  if( access_token ){
    let shortURL = TOP_TRACKS_ENDPOINT + "short_term";
    let medURL = TOP_TRACKS_ENDPOINT + "medium_term";
    let longURL = TOP_TRACKS_ENDPOINT + "long_term";
      
    let shortRes = await callAPI( shortURL, access_token)
    if (!shortRes.ok) {
      const message = `An error has occured: ${shortRes.status}`;
      throw new Error(message);
    } 
    let medRes = await callAPI( medURL, access_token)
    if (!medRes.ok) {
      const message = `An error has occured: ${medRes.status}`;
      throw new Error(message);
    } 

    let longRes = await callAPI( longURL, access_token)
    if (!longRes.ok) {
      const message = `An error has occured: ${longRes.status}`;
      throw new Error(message);
    } 

    let shortJson = await shortRes.json(); 
    let medJson = await medRes.json(); 
    let longJson = await longRes.json(); 

    let shortTracks = convertHitToTrack(shortJson.items); 
    let medTracks = convertHitToTrack(medJson.items); 
    let longTracks = convertHitToTrack(longJson.items); 

    return {shortTracks, medTracks, longTracks}; 
  } 
  return null; 
};

const AUDIO_FEATURES_ENDPOINT = `https://api.spotify.com/v1/audio-features/`;

export const getAudioFeatures = async (id) => {
  const { access_token } = await getAccessToken();
  console.log( access_token )

  let url = AUDIO_FEATURES_ENDPOINT + id;
  console.log( "URLD")
  console.log( url )

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const convertHitToTrack = (items) => {
  if( items ) {
    const tracks = items.slice(0, 10).map((track) => ({
      artist: track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      id: track.id
    }));
    return tracks; 
  }
}