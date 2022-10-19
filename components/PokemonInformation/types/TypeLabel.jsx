import {typeColors} from '../../../constants.js';
import Link from 'next/link';

export default function TypeLabel({ type }) {
  return (
    <div key={type}>
      <Link href={`/pokemon/types/${type}`}>
        <div
          className="badge m-3 capitalize cursor-pointer text-lg"
          style={{ color: typeColors[type] }}
        >
          {type}
        </div>
      </Link>
    </div>
  );
}
