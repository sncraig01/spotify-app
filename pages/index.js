import Layout from '../components/layout'
import React from "react";
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { Button } from 'antd';
import Router from 'next/router';
import { accessTokenIsValid } from '../lib/spotify.js'


export default function Home({validToken}) {
  const [ session, loading ] = useSession()

  return (
    <Layout>
      <div className="login-page">
        {/* NOT LOGGED IN */}
        {(!session || !validToken ) && <>
          <h1> Welcome to Sarah's Spotify App </h1>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>}

        {/* LOGGED IN */}
        {(session && validToken)  && <>
          <Button onClick={() => signOut()}>Sign out</Button>
          <h1> Welcome, {session.user.name}! </h1>
          <Button onClick={() => Router.push('/TopTracks')} type="primary"> Get Started! </Button>
        </>}
      </div>
    </Layout>
    
  )
  
}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  let validToken = false; 
  if( session ){
    validToken = await accessTokenIsValid(session.user.accessToken)
  }

  return {
    props: { validToken } 
  }
}