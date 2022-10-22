import Link from 'next/link';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function Navbar() {
  const session = useSession();

  console.log(session);
  return (
    <div className="navbar bg-slate-500">
      <div className="flex-1">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-xl">Home</div>
        </Link>
        <div className="navbar-start">
          <div className="dropdown dropdown-hover bg-blue">
            <label tabIndex={0} className="btn btn-ghost normal-case">
              Information
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-gray-700 rounded-box w-52"
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
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div> */}
        <div className="dropdown dropdown-hover dropdown-end bg-blue">
          {session.status === 'authenticated' ? (
            <>
              <label tabIndex={0} className="btn btn-ghost avatar normal-case">
                {session.data.user.name}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-gray-700 rounded-box w-52"
              >
                <button className="btn btn-ghost normal-case">Profile</button>
                <Link href="/api/auth/signout">
                  <button className="btn btn-ghost normal-case">Logout</button>
                </Link>
              </ul>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <div className="btn btn-ghost normal-case">Login</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
