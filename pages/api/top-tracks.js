import { getTopTracks } from '../../lib/spotify';
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession( {req} )

  if( session ){
    let data = await getTopTracks( session.user.accessToken ); 
    if( data ){
      return res.status(200).json({ data });
    } else {
      return res.status(500).json({ "ERROR" : "There was an error receiving the user's top tracks" });
    }
  }
  return res.status(401).json({ "ERROR" : "Not signed in" });  
};