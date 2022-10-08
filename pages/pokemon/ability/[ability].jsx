import { useRouter } from 'next/router';

export default function Ability() {
  const router = useRouter();

  return (
    <>
      <div className="capitalize">{router.query.ability}</div>
    </>
  );
}
