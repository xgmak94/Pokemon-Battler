import { useContext, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginContext } from '../../contexts/LoginContext';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const login = useContext(LoginContext);

  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleLogin(e) {
    e.preventDefault();

    login.setAccountInfo({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
    login.setLoggedIn(true);
    router.push('/');
  }

  return (
    <>
      <div
        className="hero min-h-screen bg-base-200"
        style={{
          backgroundImage: `url("https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/sword-shield/pokemon-in-the-wild.png")`,
        }}
      >
        <div className="hero-content flex-col">
          <div className="m-3 text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Create an account to start battling.</p>
          </div>
          <form
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl dark:bg-slate-800 bg-slate-300"
            onSubmit={(e) => handleLogin(e)}
          >
            <div className="card-body">
              <div className="form-control">
                <label htmlFor="username" className="label label-text">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="input input-bordered"
                  ref={usernameRef}
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label label-text">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="input input-bordered"
                  ref={passwordRef}
                />
              </div>
              <div className="label-text-alt link link-hover">Forgot Password?</div>
              <Link href="/api/auth/signin">
                <div className="link link-hover">Sign in with something else</div>
              </Link>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary capitalize">
                  Login
                </button>
              </div>
              <div className="label-text-alt link link-hover">
                <Link href="/account/create">Not a member? Sign up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
