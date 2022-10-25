import Link from 'next/link';

import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKGROUND})`,
        }}
      >
        {session.status === 'authenticated' ? null : (
          <>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">Login to get started</p>
                <Link href="/api/auth/signin">
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
