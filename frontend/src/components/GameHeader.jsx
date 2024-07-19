import { format } from 'date-fns';
import PokemonSprite from './PokemonSprite';

export default function GameHeader({ solved, playTime }) {
  return (
    <header
      className="fixed top-0 z-20 flex w-full flex-col items-center gap-2 border-b border-gray-200
        bg-white/90 px-4 py-2 backdrop-blur xs:flex-row xs:justify-between sm:gap-20"
    >
      <h1 className="hidden text-2xl font-bold leading-none tracking-tight md:block">
        where&apos;s that pokémon?
      </h1>

      <section className="flex gap-6">
        <PokemonSprite name="Togepi" solved={solved} />
        <PokemonSprite name="Omanyte" solved={solved} />
        <PokemonSprite name="Bonsly" solved={solved} />
      </section>

      <section className="text-right font-mono lg:w-60">
        <p>{format(playTime, 'mm:ss:SS')}</p>
      </section>
    </header>
  );
}
