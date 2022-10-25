import TypeLabel from './TypeLabel';

export default function TypeContainer({ types }) {
  return (
    <div className="flex justify-around my-3">
      {types.map((type, idx) => {
        return <TypeLabel key={idx} type={type.type.name} />;
      })}
    </div>
  );
}
