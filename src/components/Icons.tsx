interface IconProps {
  className?: string;
}

export const BeanIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 2.6c4.9 0 8.4 4.1 8.4 9.4S16.9 21.4 12 21.4 3.6 17.3 3.6 12 7.1 2.6 12 2.6Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M12 2.8c-2.6 2.6-2.4 5.2-.4 7.4 1.9 2.1 2.3 4.9-.2 7.6-1.3 1.4-2.6 2.5-3.6 3.2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export const FlameIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 2.5c.6 3.1-1 4.8-2.7 6.6C7.5 11 6 12.9 6 15.4a6 6 0 0 0 12 0c0-2.7-1.4-4.5-2.8-6.3-.5 1.2-1 1.9-2.1 2.7.4-2.9-.2-6.6-1.1-9.3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M12 21.5a3.2 3.2 0 0 1-3.2-3.2c0-1.7 1.2-2.7 3.2-4.6 2 1.9 3.2 2.9 3.2 4.6A3.2 3.2 0 0 1 12 21.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);

export const SearchIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="10.5" cy="10.5" r="6.3" stroke="currentColor" strokeWidth="1.8" />
    <path d="m15.4 15.6 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const BasketIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M3.4 9h17.2l-1.5 10.2a2 2 0 0 1-2 1.8H6.9a2 2 0 0 1-2-1.8L3.4 9Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M8 9V7.4a4 4 0 0 1 8 0V9"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path d="M9.5 13v3.4M14.5 13v3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const PlusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MinusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

export const ArrowIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4 12h15m0 0-6-6m6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrashIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4.5 6.5h15M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5M6.5 6.5 7.3 19a1.8 1.8 0 0 0 1.8 1.7h5.8A1.8 1.8 0 0 0 16.7 19l.8-12.5M10 10.5v6M14 10.5v6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MountainIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="m3 19 6-11 3.4 6.2L15 10l6 9H3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const DropIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3.2s6.4 6.7 6.4 11.2a6.4 6.4 0 0 1-12.8 0C5.6 9.9 12 3.2 12 3.2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 14.5a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const LeafIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M19.5 4.5C11 4.5 5.5 9.5 5.5 16.4c0 .8.1 1.6.3 2.3.7.2 1.5.3 2.3.3 6.9 0 11.4-5.5 11.4-14.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M4.5 19.5C8 15 12.5 11 17 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const TruckIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M3 6.5h11v10H3zM14 10h4l3 3v3.5h-7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="17.5" r="1.9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17" cy="17.5" r="1.9" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const LockIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect x="5" y="10.5" width="14" height="9.5" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M12 14.5v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const CupIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4.5 10h12v5.5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V10Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M16.5 11h1.6a2.4 2.4 0 0 1 0 4.8h-1.8" stroke="currentColor" strokeWidth="1.6" />
    <path
      className="steam-path"
      d="M8.5 6.5c0-1 .8-1.2.8-2.2M12.5 6.5c0-1 .8-1.2.8-2.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const RoastDots = ({ level, className = "" }: { level: number; className?: string }) => (
  <div className={`flex items-center gap-[5px] ${className}`} title={`Torra ${level}/5`} aria-label={`Nível de torra ${level} de 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`h-[7px] w-[7px] rounded-full transition-colors ${
          i <= level ? "bg-ember-400" : "border border-espresso-500 bg-transparent"
        }`}
      />
    ))}
  </div>
);
