import Layout from '../components/layout'
import React from "react";
import { signIn, signOut, useSession } from 'next-auth/client'
import { Button } from 'antd';
import Router from 'next/router';



export default function Home({trackShort, trackMed, trackLong}) {
  const [ session, loading ] = useSession()


  return (
    <Layout>
      <h1> Welcome to Sarah's Spotify App </h1>

      {!session && <>
        Not signed in <br/>
        <Button onClick={() => signIn()}>Sign in</Button>
      </>}
      {session && <>
        Signed in as {session.user.email} <br/>
        <Button onClick={() => signOut()}>Sign out</Button>
        <Button onClick={() => Router.push('/TopTracks')} type="primary"> Get Started! </Button>
      </>}



    </Layout>
    
  )
}


export async function getStaticProps() {
  return {
    props: {  } 
  }

}

/*
export async function getServerSideProps() {

  const res1 = await fetch(`http://localhost:3000/api/audio-features/${firstTrackId}`)
  const data2 = await res1.json()
  
  console.log( data2 );
  

}
*/