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

    // Gradient colors based on the new brand
    const startColor = "#3B82F6"; // Blue
    const endColor = "#A855F7";   // Purple
    const lightningColor = "#FACC15"; // Yellow

    return (
        <svg
            width={w}
            height={h}
            viewBox={`0 0 90 ${showText ? 130 : 85}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Vridge"
        >
            <defs>
                <linearGradient id="vridge_logo_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={color === '#ffffff' ? '#ffffff' : startColor} />
                    <stop offset="100%" stopColor={color === '#ffffff' ? '#ffffff' : endColor} />
                </linearGradient>
            </defs>

            {/* ===== V SHAPE ===== */}
            <path
                d="M5 5 L45 82 L85 5 L72 5 L45 58 L18 5 Z"
                fill="url(#vridge_logo_grad)"
            />

            {/* ===== BRIDGE in the center ===== */}
            <g stroke={color === '#ffffff' ? '#ffffff' : startColor} strokeWidth="1.5" strokeLinecap="round">
                {/* Main Cable */}
                <path d="M20 15 Q45 55 70 15" fill="none" strokeWidth="2" />
                {/* Suspension Lines */}
                <line x1="30" y1="23" x2="30" y2="40" />
                <line x1="37" y1="30" x2="37" y2="48" />
                <line x1="45" y1="33" x2="45" y2="52" />
                <line x1="53" y1="30" x2="53" y2="48" />
                <line x1="60" y1="23" x2="60" y2="40" />
                {/* Roadway */}
                <line x1="18" y1="38" x2="72" y2="38" strokeWidth="2" />
            </g>

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
                    fill={color === '#ffffff' ? '#ffffff' : (tc === '#007A33' ? '#111827' : tc)}
                >
                    Vridge
                </text>
            )}
        </svg>
    );
}
