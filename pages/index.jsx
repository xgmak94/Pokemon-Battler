import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { LoginContext } from '../contexts/LoginContext';

export default function Home() {
  const login = useContext(LoginContext);

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/sword-shield/pokemon-in-the-wild.png")`,
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
