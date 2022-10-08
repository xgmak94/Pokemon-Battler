import '../styles/globals.css';
import react, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import Navbar from '../components/Navbar';

import { LoginContext } from '../contexts/LoginContext';
import { PokemonContext } from '../contexts/PokemonContext';

let pokemonURL = 'https://pokeapi.co/api/v2/';

const SERVER_URL = 'http://localhost:3002';
const NUM_POKEMON = 151; //151 || 898

export default function MyApp({ Component, pageProps }) {
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const [allAbilities, setAllAbilities] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  const userInfo = useMemo(
    () => ({
      accountInfo,
      setAccountInfo,
      loggedIn,
      setLoggedIn,
    }),
    [accountInfo, loggedIn]
  );

  const pokemonInfo = useMemo(
    () => ({
      allPokemon,
      setAllPokemon,
      allAbilities,
      setAllAbilities,
      allTypes,
      setAllTypes,
    }),
    [allPokemon, allAbilities, allTypes]
  );

  useEffect(() => {
    async function getAllPokemon() {
      let results = await axios.get(`${SERVER_URL}/pokemon`, {
        params: { limit: NUM_POKEMON },
      });
      setAllPokemon(results.data);
    }

    async function getAllAbilities() {
      let results = await axios.get(`${SERVER_URL}/abilities`);
      setAllAbilities(results.data);
    }

    async function getAllTypes() {
      let results = await axios.get(`${SERVER_URL}/types`);
      setAllTypes(results.data);
    }

    getAllPokemon();
    getAllAbilities();
    getAllTypes();
  }, []);

  // useEffect(() => {
  //   // async function getAllPokemon() {
  //   //   let info = await axios.get(`${pokemonURL}pokemon`, {params: {limit : 151}});
  //   //   setAllPokemon(info.data.results);
  //   // }

  //   // getAllPokemon();
  // }, [])
  return (
    <>
      <LoginContext.Provider value={userInfo}>
        <PokemonContext.Provider value={pokemonInfo}>
          <Navbar />
          <Component {...pageProps} />
        </PokemonContext.Provider>
      </LoginContext.Provider>
    </>
  );
}
