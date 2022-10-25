import Link from 'next/link';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function Navbar() {
  const session = useSession();

  return (
    <div className="navbar bg-slate-500">
      <div className="flex-1">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-xl">Home</div>
        </Link>
        <div className="flex flex-row navbar-start">
          <div className="dropdown dropdown-hover bg-blue">
            <label tabIndex={0} className="btn btn-ghost normal-case">
              Information
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-gray-400 dark:bg-gray-600 rounded-box w-52"
            >
              <Link href="/pokemon">
                <button className="btn btn-ghost normal-case">Pokemon</button>
              </Link>
              <Link href="/pokemon/abilities">
                <button className="btn btn-ghost normal-case">Abilities</button>
              </Link>
              <Link href="/pokemon/types">
                <button className="btn btn-ghost normal-case">Types</button>
              </Link>
            </ul>
          </div>
          {session.status === 'authenticated' ? (
            <Link href="/teams">
              <div className="btn btn-ghost normal-case">Teams</div>
            </Link>
          ) : null}
        </div>
      </div>

      {session.status === 'authenticated' ? (
        <>
          <div className="flex flex-row">
            <div className="flex items-center mx-3">Hello, {session.data.user.name}</div>
            <div className="dropdown dropdown-hover dropdown-end">
              <label tabIndex={0} className="btn btn-ghost avatar normal-case">
                <Image
                  className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={session.data.user.image}
                  alt="Bordered avatar"
                  width="50%"
                  height="50%"
                  layout="intrinsic"
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-gray-400 dark:bg-gray-600 rounded-box w-52"
              >
                <Link href="/profile">
                  <button className="btn btn-ghost normal-case">Profile</button>
                </Link>
                <Link href="/api/auth/signout">
                  <button className="btn btn-ghost normal-case">Logout</button>
                </Link>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <Link href="/api/auth/signin">
          <div className="btn btn-ghost normal-case">Login</div>
        </Link>
      )}
    </div>
  );
}
