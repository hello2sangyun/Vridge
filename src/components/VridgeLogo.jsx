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

            {/* ===== LIGHTNING BOLT in the center ===== */}
            <path
                d="M48 24 L36 44 H44 L42 62 L56 38 H48 L50 24 Z"
                fill={lightningColor}
                stroke={color === '#ffffff' ? '#000000' : 'none'}
                strokeWidth="1"
            />

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
