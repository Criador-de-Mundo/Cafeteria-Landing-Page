import { CheckIcon } from "./Icons";

export interface Toast {
  id: number;
  title: string;
  sub?: string;
}

interface ToastsProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export default function Toasts({ toasts, onDismiss }: ToastsProps) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[80] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:left-6 sm:translate-x-0 sm:px-0">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className="animate-toast-in pointer-events-auto flex w-full items-start gap-3 rounded-xl border border-ember-500/40 bg-espresso-800/95 px-4 py-3.5 text-left shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur transition-transform hover:scale-[1.01] active:scale-[0.98]"
        >
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ember-500 text-espresso-950">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span>
            <span className="block text-sm font-extrabold text-crema-50">{t.title}</span>
            {t.sub && <span className="mt-0.5 block text-[12px] font-semibold text-crema-300">{t.sub}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
