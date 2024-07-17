export default function TaggingSelect({ coords, children }) {
  if (!coords) return;

  const left = coords.x > 800 ? coords.x - 115 : coords.x + 35;
  const top = coords.y > 650 ? coords.y - 115 : coords.y;

  return (
    <div
      className="absolute z-20 flex flex-col"
      style={{
        top,
        left,
      }}
    >
      {children}
    </div>
  );
}
