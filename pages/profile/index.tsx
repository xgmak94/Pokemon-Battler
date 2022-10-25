import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  console.log(session);
  return (
    <>
      {session.status === 'authenticated' ? (
        <div className="grid grid-cols-2 m-3">
          <div className="flex justify-center">Name:</div>
          <div className="flex justify-start">{session.data.user.name}</div>
          <div className="flex justify-center">Email:</div>
          <div className="flex justify-start">{session.data.user.email}</div>
        </div>
      ) : null}
    </>
  );
}
