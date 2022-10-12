import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { PokemonContext } from '../../../contexts/PokemonContext';

import TypeLabel from '../../../components/PokemonInformation/types/TypeLabel';
import MoveCollapse from '../../../components/PokemonInformation/moves/MoveCollapse';
import DisplayPokemon from '../../../components/DisplayPokemon';
import PokemonCollapse from '../../../components/PokemonCollapse';

import axios from 'axios';

export default function Type() {
  const [nameSorted, setNameSorted] = useState(1);
  const [powerSorted, setPowerSorted] = useState(1);

  const [moveData, setMoveData] = useState([]);
  const router = useRouter();
  let typeName = router.query.type;
  let pokemon = useContext(PokemonContext);

  let info = pokemon.allTypes[pokemon.allTypes.findIndex((type) => type.name === typeName)];

  let pokemonWithType = pokemon.allPokemon.filter((pokemon, idx) => {
    for (let i = 0; i < pokemon.types.length; i++) {
      if (pokemon.types[i].type.name === typeName) {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    let moveInfo = info.moves.map(async (move) => {
      return await axios.get(move.url);
    });

    let movesArr = [];
    Promise.all(moveInfo).then((ret) => {
      ret.forEach((res) => {
        movesArr.push(res.data);
      });
      movesArr.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setMoveData(movesArr);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center my-3">
          <TypeLabel type={router.query.type} />
        </div>
      </div>
      <MoveCollapse text="See moves" moveData={moveData} setMoveData={setMoveData} />
      <PokemonCollapse text="See Pokemon" displayPokemon={pokemonWithType} />
    </>
  );
}

function ArrowUpDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
      />
    </svg>
  );
}
