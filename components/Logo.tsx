export function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 8px rgba(214, 47, 47, 0.3))" }}
    >
      {/* Escudo */}
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D62F2F" />
          <stop offset="100%" stopColor="#a62222" />
        </linearGradient>
      </defs>

      {/* Fondo del escudo */}
      <path
        d="M 20 2 L 32 8 L 32 18 C 32 28 20 36 20 36 C 20 36 8 28 8 18 L 8 8 Z"
        fill="url(#shieldGradient)"
        stroke="#ff6b6b"
        strokeWidth="0.5"
      />

      {/* Destello/brillo */}
      <ellipse cx="22" cy="12" rx="6" ry="8" fill="rgba(255, 255, 255, 0.15)" />

      {/* Símbolo central - Red Team (RT) estilizado */}
      <text
        x="20"
        y="26"
        fontSize="16"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
      >
        RT
      </text>

      {/* Punto de énfasis */}
      <circle cx="20" cy="35" r="1.5" fill="#ff6b6b" opacity="0.8" />
    </svg>
  )
}
