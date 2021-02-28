import Link from 'next/link'
import Layout from '../components/layout'
import { Tabs } from 'antd';
import { useSession, getSession } from 'next-auth/client'
import { getTopTracks } from '../lib/spotify';


const { TabPane } = Tabs;
//style={{ "color": "blueviolet" }}
export default function Home({trackShort, trackMed, trackLong}) {
  const [ session, loading ] = useSession()

  if (session) {
    return (
      <Layout>
        <div className="top-tracks-selector" >
          <h1> Your top songs!</h1>
          <div> Top 10 songs: </div>
          <Link href="/otherPage">
              <a>second page</a>
          </Link>
          <br/>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Short Term Favorites" key="1">
              <ul>
                {trackShort.map(x => (
                  <li key={x.title}>
                      <div>
                        <a>{x.title}</a> - <a>{x.artist}</a>
                      </div>
                  </li>
                ))}
              </ul>
            </TabPane>
            <TabPane tab="Medium Term Favorites" key="2">
              <ul>
                {trackMed.map(x => (
                  <li key={x.title}>
                      <div>
                        <a>{x.title}</a> - <a>{x.artist}</a>
                      </div>
                  </li>
                ))}
              </ul>
            </TabPane>
            <TabPane tab="Long Term Favorites" key="3">
              <ul>
                  {trackLong.map(x => (
                    <li key={x.title}>
                        <div>
                          <a>{x.title}</a> - <a>{x.artist}</a>
                        </div>
                    </li>
                  ))}
                </ul>
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
          <div> not authenticated lol </div>
      </Layout>
    )
  }
}


export async function getServerSideProps(context) {  
  const session = await getSession(context)

  if( session ){
    const data = await getTopTracks(session.user.accessToken);

    let trackShort = data.shortTracks; 
    let trackMed = data.medTracks;
    let trackLong = data.longTracks;
  
    if( !trackShort ){ return { notFound: true }};
    if( !trackMed ){ return { notFound: true }};
    if( !trackLong ){ return { notFound: true }};
  
    return {
      props: { trackShort, trackMed, trackLong } 
    } 
  }
  
  return {}
}

function callback(key){
  console.log( key )
}
