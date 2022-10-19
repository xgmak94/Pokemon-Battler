import Image from 'next/image';
import Link from 'next/link';

import TypeContainer from '../components/PokemonInformation/types/TypeContainer';

export default function DisplayPokemon({ displayPokemon }) {
  return (
    <>
      <div className="grid grid-cols-3">
        {displayPokemon &&
          displayPokemon.map((pokemon, idx) => {
            return (
              <div key={pokemon.name} className="card m-3 dark:bg-slate-800 bg-slate-300 shadow-xl">
                <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
                  <div className="border-b-2 border-black m-3">
                    <Image
                      src={pokemon.sprites.other['official_artwork'].front_default}
                      className="cursor-pointer"
                      alt="Pokemon"
                      width="250"
                      height="250"
                      layout="responsive"
                    />
                  </div>
                </Link>
                <div className="card-body p-3">
                  <h2 className="card-title capitalize m-3">
                    <div>#{pokemon.id_}</div>
                    <div>{pokemon.name.split('-').join(' ')}</div>
                  </h2>
                  <TypeContainer types={pokemon.types} />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
