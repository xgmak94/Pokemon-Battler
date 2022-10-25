import DisplayPokemon from './DisplayPokemon';

export default function PokemonCollapse({text, displayPokemon}) {
  return (
    <div className="collapse collapse-arrow m-3">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-gray-500 text-primary-content">{text}</div>
      <div className="collapse-content bg-gray-500 text-primary-content">
        <DisplayPokemon displayPokemon={displayPokemon} />
      </div>
    </div>
  );
}
