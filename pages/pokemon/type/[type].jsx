import React from 'react';
import { useRouter } from 'next/router';

export default function Type() {
  const router = useRouter();

  return (
    <>
      <div className="capitalize">{router.query.type}</div>
    </>
  );
}
