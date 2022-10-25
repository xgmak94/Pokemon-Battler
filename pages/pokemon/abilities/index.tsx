import { useState } from 'react';
import Link from 'next/link';
import prisma from '../../../utils/ConnectPrisma.js';
import { AbilitiesEffectEntries } from '@prisma/client';

export async function getServerSideProps() {
  const abilities = await prisma.abilities.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      effect_entries: true,
      name: true,
    },
  });

  return {
    props: {
      abilities,
    },
  };
}

interface Props {
  abilities: Array<Abilities>;
}

interface Abilities {
  name: string;
  effect_entries: Array<Effect_Entry>;
}

interface Effect_Entry {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

export default function Abilities({ abilities }: Props) {
  const [nameFilter, setNameFilter] = useState('');

  let filteredAbilities = abilities.filter((ability) => {
    if (ability.name.includes(nameFilter)) {
      return true;
    }
    return false;
  });

  function handleChange(e) {
    if (e.target.value.length >= 2) {
      setNameFilter(e.target.value);
    } else {
      setNameFilter('');
    }
  }

  return (
    <>
      <div className="flex justify-center m-3">
        <input
          className="h-1/6 rounded-full text-center text-4xl"
          type="text"
          placeholder="Search for an ability..."
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="overflow-y-auto">
        <table className="table-auto table-compact m-3">
          <thead className="bg-slate-400">
            <tr>
              <th className="border-2 border-black">Name</th>
              <th className="border-2 border-black">Effect</th>
            </tr>
          </thead>
          <tbody>
            {filteredAbilities.map((ability, idx) => {
              let flavorText = ability.effect_entries.find((entry) => {
                return entry.language.name === 'en';
              });

              return (
                <tr key={ability.name} className="odd:bg-slate-500 even:bg-slate-700">
                  <td className="capitalize link-hover border-2 border-black">
                    <Link href={`/pokemon/abilities/${ability.name}`}>
                      {ability.name.split('-').join(' ')}
                    </Link>
                  </td>
                  <td className="overflow-auto border-2 border-black">
                    {flavorText ? flavorText.effect : `Could not find data on ${ability.name}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
