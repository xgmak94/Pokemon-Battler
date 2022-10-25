import AbilityLabel from './AbilityLabel';

export default function TypeContainer({ abilities }) {
  return (
    <div className="flex justify-around my-3">
      {abilities.map((ability) => {
        return <AbilityLabel key={ability.name} ability={ability} />;
      })}
    </div>
  );
}
