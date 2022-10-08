import { useState, useEffect, useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { PokemonContext } from '../../contexts/PokemonContext';

import TypeLabel from '../../components/TypeLabel';
import AbilityLabel from '../../components/AbilityLabel';

export default function Pokemon() {
  let pokemon = useContext(PokemonContext);

  const [search, setSearch] = useState();

  console.log(pokemon);
  return (
    <div className="lg:grid lg:grid-cols-5 md:grid md:grid-cols-3">
      {pokemon.allPokemon.map((pokemon) => {
        return (
          <div key={pokemon.name} className="card m-3 bg-base-100 shadow-xl">
            <figure>
              <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  className="cursor-pointer"
                  alt="Pokemon"
                  width="200"
                  height="200"
                />
              </Link>
            </figure>
            <div className="card-body">
              <h2 className="card-title capitalize">
                <div>#{pokemon.id}</div>
                <div>{pokemon.name}</div>
              </h2>
              <div className="flex justify-around">
                {pokemon.types.map((type) => {
                  return <TypeLabel key={type.type.name} type={type} />;
                })}
              </div>
              <div className="flex justify-around">
                {pokemon.abilities.map((ability) => {
                  return <AbilityLabel key={ability.ability.name} ability={ability} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
