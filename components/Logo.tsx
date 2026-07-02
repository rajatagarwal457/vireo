export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M25 5C13 5 6 13 5 24c10-1 19-6 20-19Z" fill="#17B26A" />
      <path d="M9 21 21 9" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12.5 18.5 16 18M11 16 14.5 15.5M15 15 18 14.5M13.5 13 16.5 12.5"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".75"
      />
    </svg>
  );
}
