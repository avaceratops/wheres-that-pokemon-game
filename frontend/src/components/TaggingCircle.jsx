export default function TaggingCircle({ coords }) {
  if (!coords) return;

  return (
    <div
      className="pointer-events-none absolute z-10 h-[60px] w-[60px] rounded-full border-4
        border-red-500"
      style={{
        top: coords.y - 30,
        left: coords.x - 30,
        boxShadow: '0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .6)',
      }}
    />
  );
}
