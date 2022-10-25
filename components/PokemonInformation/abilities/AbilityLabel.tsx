import Link from 'next/link';

export default function AbilityLabel({ ability }) {
  let abilityName = ability.ability.name.split('-').join(' ');
  return (
    <Link href={`/pokemon/abilities/${ability.ability.name}`}>
      <div key={abilityName} className="m-3 capitalize cursor-pointer">
        {abilityName}
      </div>
    </Link>
  );
}
