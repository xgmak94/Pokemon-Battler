import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { PokemonContext } from '../../contexts/PokemonContext';

import TypeContainer from '../../components/PokemonInformation/types/TypeContainer';
import AbilityContainer from '../../components/PokemonInformation/abilities/AbilityContainer';
import MoveCollapse from '../../components/PokemonInformation/moves/MoveCollapse';

import axios from 'axios';

export async function getServerSideProps(context) {
  const { query } = context;
  const { pokemon } = query;

  return {
    props: {
      pokemonName: pokemon,
    },
  };
}

export default function Pokemon({ pokemonName }) {
  const [moveData, setMoveData] = useState([]);
  const pokemon = useContext(PokemonContext);
  const router = useRouter();

  let info = pokemon.allPokemon[pokemon.allPokemon.findIndex((mon) => mon.name === pokemonName)];

  // useEffect(() => {
  //   let moveInfo = info.moves.map(async (move) => {
  //     return await axios.get(move.move.url);
  //   });

  //   let movesArr = [];
  //   Promise.all(moveInfo).then((ret) => {
  //     ret.forEach((res) => {
  //       movesArr.push(res.data);
  //     });
  //     movesArr.sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     });
  //     setMoveData(movesArr);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <div className="card flex flex-col justify-center">
        <div className="flex justify-center">
          <Image
            src={info.sprites.other['official-artwork'].front_default}
            alt="Pokemon"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h2 className="card-title capitalize justify-center">
            <div>#{info.id}</div>
            <div>{info.name.split('-').join(' ')}</div>
          </h2>
          <TypeContainer types={info.types} />
          <AbilityContainer abilities={info.abilities} />
          {/* <MoveCollapse text="See moves" moveData={moveData} setMoveData={setMoveData} /> */}
        </div>
      </div>
    </>
  );
}
