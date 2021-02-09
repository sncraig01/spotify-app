import { getAudioFeatures } from '../../../lib/spotify';

export default async (req, res) => {
  const {
    query: { trackId },
  } = req

  const response = await getAudioFeatures( trackId );
  const { items } = await response.json();

  console.log( response );
  if( items ) {
    console.log( items )
    return res.status(200).json({ tracks });
  }

  return res.status(200).json({ "error" : "this one errored" });

};