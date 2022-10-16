import { useContext } from 'react';
import Link from 'next/link';
import { LoginContext } from '../contexts/LoginContext';

export default function Navbar() {
  const login = useContext(LoginContext);

  function handleLogout() {
    login.setAccountInfo({});
    login.setLoggedIn(false);
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-xl">Home</div>
        </Link>
      </div>
      <div className="navbar-start">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-ghost normal-case">
            Information
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
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
        {login.loggedIn ? (
          <Link href="/teams">
            <div className="btn btn-ghost normal-case">Teams</div>
          </Link>
        ) : null}
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div> */}
        <div className="dropdown dropdown-end">
          {login.loggedIn ? (
            <>
              <label tabIndex={0} className="btn btn-ghost avatar normal-case">
                {login.accountInfo.username}
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <button>Profile</button>
                <button>Settings</button>
                <button onClick={(e) => handleLogout()}>Logout</button>
              </ul>
            </>
          ) : (
            <Link href="/account/login">
              <div className="btn btn-ghost normal-case">Login</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
