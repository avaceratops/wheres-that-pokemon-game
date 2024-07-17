import styles from '../styles/PokemonSprite.module.scss';

export default function PokemonSprite({ name, solved }) {
  const found = solved[name];
  const src = `/${name.toLowerCase()}.png`;

  return (
    <div className="relative h-12 w-12">
      <img src={src} alt={name} className={`${found ? styles.found : ''}`} />
      {found && <span className="absolute -bottom-0.5 -right-0.5 text-lg">✅</span>}
    </div>
  );
}
