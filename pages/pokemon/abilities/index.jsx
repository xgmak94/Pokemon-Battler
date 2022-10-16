import Link from 'next/link';
import prisma from '../../../utils/ConnectPrisma.js';

export async function getServerSideProps() {
  const abilities = await prisma.abilities.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return {
    props: {
      abilities,
    },
  };
}

export default function Abilities({ abilities }) {
  console.log(abilities);

  return (
    <>
      <div className="overflow-y-auto">
        <table className="table-auto table-compact m-3">
          <thead className="bg-slate-400">
            <th className="border-2 border-black">Name</th>
            <th className="border-2 border-black">Effect</th>
          </thead>
          <tbody>
            {abilities.map((ability, idx) => {
              let flavorText =
                ability.effect_entries.find((entry) => {
                  return entry.language.name === 'en';
                }) || `Cannot find data on ${ability.name}`;

              return (
                <tr key={ability.name} className="odd:bg-slate-500 even:bg-slate-700">
                  <td className="capitalize link-hover border-2 border-black">
                    <Link href={`/pokemon/abilities/${ability.name}`}>
                      {ability.name.split('-').join(' ')}
                    </Link>
                  </td>
                  <td className="overflow-auto border-2 border-black">{flavorText.effect || flavorText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
