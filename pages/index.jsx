import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { LoginContext } from '../contexts/LoginContext';
import { useSession } from 'next-auth/react';

export default function Home() {
  const login = useContext(LoginContext);

  // const data = useSession();

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKGROUND})`,
        }}
      >
        {login.loggedIn ? null : (
          <>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">Login to get started</p>
                <Link href="/account/login">
                  <div className="btn btn-primary capitalize">Login</div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
