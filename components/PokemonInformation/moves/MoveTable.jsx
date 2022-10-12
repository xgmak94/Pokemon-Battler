import { useState } from 'react';

export default function MoveTable({ moveData, setMoveData }) {
  const [nameSorted, setNameSorted] = useState(1);
  const [powerSorted, setPowerSorted] = useState(1);

  function sortMoves(by, order) {
    let arr = [...moveData];
    arr.sort((a, b) => {
      if (by === 'name') {
        if (order === -1) {
          return b.name.localeCompare(a.name);
        } else if (order === 1) {
          return a.name.localeCompare(b.name);
        }
      } else if (by === 'power') {
        if (order === -1) {
          return b.power - a.power;
        } else if (order === 1) {
          return a.power - b.power;
        }
      }
    });
    setMoveData(arr);
  }

  function sortPower() {
    sortMoves('power', -powerSorted);
    setPowerSorted((prev) => -prev);
  }

  function sortName() {
    sortMoves('name', -nameSorted);
    setNameSorted((prev) => -prev);
  }

  return (
    <>
      <div className="overflow-x-auto h-[50vh]">
        <table className="table table-compact table-zebra w-full capitalize">
          <thead>
            <tr>
              <th className="items-start cursor-pointer" onClick={(e) => sortName()}>
                <div className="flex">
                  name
                  <ArrowUpDown />
                </div>
              </th>
              <th className="cursor-pointer" onClick={(e) => sortPower()}>
                <div className="flex">
                  power
                  <ArrowUpDown />
                </div>
              </th>
              <th className="cursor-pointer">
                <div className="flex">accuracy</div>
              </th>
              <th className="cursor-pointer">
                <div className="flex">pp</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {moveData.map((move) => {
              return (
                <tr key={move.name} className="hover">
                  <td>{move.name.split('-').join(' ')}</td>
                  <td>{move.power}</td>
                  <td>{move.accuracy}</td>
                  <td>{move.pp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ArrowUpDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
      />
    </svg>
  );
}
