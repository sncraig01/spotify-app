import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { grabSession } from '../lib/spotify'

export default function otherPage({num}) {
  const [ session, loading ] = useSession()


  if (typeof window !== 'undefined' && loading) return null
  if (session) {
    return <div>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>

      <img src={session.user.picture}></img>


    </div>
  }
  return <p>Access Denied</p>
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  //console.log( session.user.accessToken )
  

  return { props: {} }

}