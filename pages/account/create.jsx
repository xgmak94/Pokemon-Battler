import { useState, useContext, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginContext } from '../../contexts/LoginContext';
import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();
  const login = useContext(LoginContext);

  const userRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  function handleSignup(e) {
    e.preventDefault();

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
        <div className="hero-content flex-col lg:flex-row-reverse">
          <form
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            onSubmit={(e) => handleSignup(e)}
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered bg-white text-black"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Password"
                  className="input input-bordered bg-white text-black"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reenter Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Reenter Password"
                  className="input input-bordered bg-white text-black"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary capitalize">Sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
