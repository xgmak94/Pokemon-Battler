import { useContext } from 'react';
import { useRouter } from 'next/router';
import { PokemonContext } from '../../../contexts/PokemonContext';

import PokemonCollapse from '../../../components/PokemonCollapse';

export default function Ability() {
  const router = useRouter();
  let abilityName = router.query.ability;
  let pokemon = useContext(PokemonContext);
  let info =
    pokemon.allAbilities[pokemon.allAbilities.findIndex((ability) => ability.name === abilityName)];

  let flavorText =
    info.effect_entries[info.effect_entries.findIndex((flavor) => flavor.language.name === 'en')]
      .effect;

  let pokemonWithAbility = pokemon.allPokemon.filter((pokemon) => {
    for (let i = 0; i < pokemon.abilities.length; i++) {
      if (pokemon.abilities[i].ability.name === abilityName) return true;
    }
    return false;
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center capitalize">
          {router.query.ability.split('-').join(' ')}
        </div>
        <div className="flex justify-center">{flavorText}</div>
        <PokemonCollapse text="Pokemon with ability" displayPokemon={pokemonWithAbility} />
      </div>
    </>
  );
}
