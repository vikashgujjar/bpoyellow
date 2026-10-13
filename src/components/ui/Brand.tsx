type Props = {
  /** True when shown on a black background. */
  onDark?: boolean;
  className?: string;
};

/** Text wordmark used in place of a logo. */
export default function Brand({ onDark = false, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[1.2rem] font-extrabold leading-none tracking-tight sm:text-[1.3rem] ${className}`}
    >
      <span
        className={`rounded-lg px-2 py-1 text-[0.95em] transition-colors duration-300 delay-[380ms] ${
          onDark ? "bg-brand text-ink" : "bg-ink text-brand"
        }`}
      >
        BPO
      </span>
      Call Center
    </span>
  );
}
