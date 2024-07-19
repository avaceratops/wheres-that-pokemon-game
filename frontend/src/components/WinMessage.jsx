// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { formatTime } from '../utils/timer';

export default function Modal({ playTime, resetGame }) {
  return (
    <section className="flex flex-col items-center">
      <h3 className="text-base/7 font-medium">You beat the game!</h3>

      <p className="mt-2">{`It took you ${formatTime(playTime)}.`}</p>

      <div className="mt-4">
        <button
          className="rounded-md bg-indigo-700 px-3 py-1.5 font-semibold text-white shadow-inner
            shadow-white/10 hover:bg-indigo-600 focus:outline-none"
          onClick={resetGame}
        >
          Restart
        </button>
      </div>
    </section>
  );
}
