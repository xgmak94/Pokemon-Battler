import { getSession } from 'next-auth/react';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  console.log(session);

  return {
    props: {
      session,
    },
  };
}

export default function Teams(props, { session, teams }) {
  console.log(props);
  return <div>index</div>;
}
