import TypeLabel from './TypeLabel.jsx';

export default function TypeContainer({ types }) {
  return (
    <div className="flex justify-around my-3">
      {types.map((type) => {
        return <TypeLabel key={type.type.name} type={type.type.name} />;
      })}
    </div>
  );
}
