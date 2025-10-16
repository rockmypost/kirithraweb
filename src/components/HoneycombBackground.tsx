export const HoneycombBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      <svg width="100%" height="100%" className="animate-float">
        <defs>
          <pattern
            id="honeycomb"
            x="0"
            y="0"
            width="100"
            height="86.6"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="50,5 93.3,25 93.3,75 50,95 6.7,75 6.7,25"
              fill="none"
              stroke="hsl(var(--accent-gold))"
              strokeWidth="1"
            />
            <polygon
              points="0,43.3 43.3,63.3 43.3,113.3 0,133.3 -43.3,113.3 -43.3,63.3"
              fill="none"
              stroke="hsl(var(--accent-gold))"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#honeycomb)" />
      </svg>
    </div>
  );
};
