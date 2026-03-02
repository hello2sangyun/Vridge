import React from 'react';

/**
 * Vridge SVG logo mark — "V" shape with suspension bridge inside
 * Props:
 *  - height: px height (width auto)
 *  - color: main color (default: #007A33)
 *  - textColor: wordmark color (default: same as color)
 *  - showText: show "Vridge" wordmark below (default: true)
 */
export default function VridgeLogo({
    height = 44,
    color = '#007A33',
    textColor,
    showText = true,
}) {
    const tc = textColor || color;
    const ratio = showText ? 1.45 : 1;
    const w = height * 0.9;
    const h = height * ratio;

    return (
        <svg
            width={w}
            height={h}
            viewBox={`0 0 90 ${showText ? 130 : 85}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Vridge"
        >
            {/* ===== V SHAPE ===== */}
            <path
                d="M5 5 L45 82 L85 5 L72 5 L45 58 L18 5 Z"
                fill={color}
            />

            {/* ===== BRIDGE (suspension) inside the V ===== */}
            {/* Deck / road */}
            <line x1="16" y1="44" x2="74" y2="44" stroke="white" strokeWidth="2.8" strokeLinecap="round" />

            {/* Left tower */}
            <line x1="30" y1="32" x2="30" y2="56" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            {/* Right tower */}
            <line x1="60" y1="32" x2="60" y2="56" stroke="white" strokeWidth="2.2" strokeLinecap="round" />

            {/* Main cables (arch) */}
            <path d="M17 44 Q45 22 73 44" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Suspender cables from arch to deck */}
            {[22, 27, 33, 38, 45, 52, 57, 63, 68].map((x) => {
                // point on the catenary y = 22 + (x-17)(x-73)*(-0.012)... approx
                const t = (x - 45) / 28; // -1 to 1
                const cy = 44 - 22 * (1 - t * t); // parabola: peak at center
                return (
                    <line
                        key={x}
                        x1={x} y1={cy}
                        x2={x} y2={44}
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity="0.85"
                    />
                );
            })}

            {/* ===== WORDMARK ===== */}
            {showText && (
                <text
                    x="45"
                    y="120"
                    textAnchor="middle"
                    fontFamily="'Inter', 'Pretendard', sans-serif"
                    fontWeight="800"
                    fontSize="22"
                    letterSpacing="-0.5"
                    fill={tc}
                >
                    Vridge
                </text>
            )}
        </svg>
    );
}
