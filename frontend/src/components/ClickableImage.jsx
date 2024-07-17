export default function ClickableImage({ src, alt = '', onClick }) {
  return <img src={src} alt={alt} onClick={onClick} className="max-w-screen-2xl" />;
}
