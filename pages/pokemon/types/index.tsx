import prisma from '../../../utils/ConnectPrisma.js';

export async function getServerSideProps() {
  const types = await prisma.types.findMany({
    orderBy: {
      id_: 'asc',
    },
    take: 16,
    select: {
      damage_relations: true,
      id_: true,
      name: true,
    },
  });

  return {
    props: {
      types,
    },
  };
}

interface Props {
  types: Array<Types>;
}

interface Types {
  id_: Number;
  name: string;
}

export default function Type({ types }: Props) {
  console.log(types);
  return (
    <>
      <div className="grid grid-col-[16]">
        <div className="flex flex-row m-3">
          {types.map((type) => {
            return (
              <div key={type.name} className="m-1">
                {type.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
