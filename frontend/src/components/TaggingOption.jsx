export default function TaggingOption({ name, solved, onClick }) {
  if (solved[name]) return;

  return (
    <button data-name={name} onClick={onClick} className="border bg-white p-2 hover:bg-neutral-200">
      {name}
    </button>
  );
}
