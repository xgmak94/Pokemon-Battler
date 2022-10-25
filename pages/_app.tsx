import type { AppProps } from 'next/app';

import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import Head from 'next/head';

import Navbar from '../components/Navbar';

export default function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Pokemon battle</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
