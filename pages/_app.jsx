import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import Head from 'next/head';

import Navbar from '../components/Navbar';

import { LoginProvider } from '../contexts/LoginContext';
import { PokemonProvider } from '../contexts/PokemonContext';

export default function MyApp({ Component, pageProps, session, pokemon }) {
  return (
    <>
      <Head>
        <title>Pokemon battle</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <SessionProvider session={session}>
        <LoginProvider>
          {/* <PokemonProvider> */}
          <Navbar />
          <Component {...pageProps} />
          {/* </PokemonProvider> */}
        </LoginProvider>
      </SessionProvider>
    </>
  );
}
