import prisma from '../../../utils/ConnectPrisma.js';

export async function getServerSideProps() {
  const types = await prisma.types.findMany({
    orderBy: {
      id_: 'asc',
    },
    take: 16,
  });

  return {
    props: {
      types,
    },
  };
}

export default function Type({ types }) {
  console.log(types);
  return (
    <>
      <div className="grid grid-col-[16]">
        <div className="flex flex-row m-3">
          {types.map((type) => {
            return <div className="m-1">{type.name}</div>;
          })}
        </div>
      </div>
    </>
  );
}
