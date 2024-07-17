import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function Modal({ isOpen, title, desc, buttonText, onClick }) {
  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded-xl border-2
                border-neutral-400 bg-white/90 p-4 shadow-lg backdrop-blur duration-300 ease-out
                data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
                {title}
              </DialogTitle>

              <p className="mt-2">{desc}</p>

              <div className="mt-4">
                <button
                  className="rounded-md bg-indigo-700 px-3 py-1.5 font-semibold text-white
                    shadow-inner shadow-white/10 hover:bg-indigo-600 focus:outline-none"
                  onClick={onClick}
                >
                  {buttonText}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
