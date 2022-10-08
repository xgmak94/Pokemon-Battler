import Link from 'next/link';

export default function AbilityLabel({ ability }) {
  let abilityName = ability.ability.name.split('-').join(' ');
  return (
    <Link href={`/pokemon/ability/${ability.ability.name}`}>
      <div key={abilityName} className="badge-lg capitalize cursor-pointer">
        {abilityName}
      </div>
    </Link>
  );
}
