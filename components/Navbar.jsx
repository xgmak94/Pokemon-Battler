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
        <Link href="/pokemon">
          <div className="btn btn-ghost normal-case">Pokemon</div>
        </Link>
        {login.loggedIn ? (
          <div className="btn btn-ghost normal-case">
            <Link href="/teams">Teams</Link>
          </div>
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
            <div className="btn btn-ghost normal-case">
              <Link href="/account/login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}