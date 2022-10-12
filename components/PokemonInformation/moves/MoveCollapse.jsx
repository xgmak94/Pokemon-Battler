import MoveTable from './MoveTable';

export default function MoveCollapse({text, moveData, setMoveData}) {
  return (
    <div className="collapse collapse-arrow m-3">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-gray-500 text-primary-content">{text}</div>
      <div className="collapse-content bg-gray-500 text-primary-content">
        <MoveTable moveData={moveData} setMoveData={setMoveData} />
      </div>
    </div>
  );
}
