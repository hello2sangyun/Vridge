import React from 'react';

const base = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

export function IconLanguage({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M3 5h12M9 3v2M10.048 14.5a15.93 15.93 0 01-3.048-4.5m0 0A15.93 15.93 0 013 14" />
            <path d="M14 5l4.5 9.5L22 5M15.2 12.5h5.6" />
            <line x1="9" y1="7" x2="9" y2="7.01" strokeWidth={2.5} />
        </svg>
    );
}

export function IconDocument({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M9 12h6M9 16h6M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 3v5h5" />
        </svg>
    );
}

export function IconShield({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

export function IconBriefcase({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v.01" />
            <path d="M2 12h20" />
        </svg>
    );
}

export function IconBuilding({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M3 21h18M4 21V7l8-4 8 4v14" />
            <path d="M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
            <rect x="9" y="9" width="2" height="2" />
            <rect x="13" y="9" width="2" height="2" />
            <rect x="9" y="13" width="2" height="2" />
            <rect x="13" y="13" width="2" height="2" />
        </svg>
    );
}

export function IconPeople({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <circle cx="9" cy="7" r="3" />
            <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            <path d="M16 11a3 3 0 100-6M21 21v-2a4 4 0 00-3-3.87" />
        </svg>
    );
}

export function IconRefresh({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M12 2a10 10 0 010 20 10 10 0 01-7.07-2.93" />
            <path d="M3 12a10 10 0 013.07-7.19" />
            <polyline points="3 3 3 9 9 9" />
        </svg>
    );
}

export function IconPin({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M12 21c0 0-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}

export function IconTarget({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

export function IconChart({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M3 3v18h18" />
            <path d="M7 16l4-4 4 4 4-6" />
        </svg>
    );
}

export function IconGlobe({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
    );
}

export function IconLightning({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M13 2L4.09 12.96A1 1 0 005 14.5h6.5l-1 7L19.92 10.6A1 1 0 0019 9H13z" />
        </svg>
    );
}

export function IconShieldCheck({ size = 24, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12.5l2 2 4-4.5" />
        </svg>
    );
}

export function IconArrowRight({ size = 16, color = 'currentColor', stroke = 2.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    );
}

export function IconCheck({ size = 14, color = 'currentColor', stroke = 2.5 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

export function IconCalendar({ size = 32, color = 'currentColor', stroke = 1.6 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
            <circle cx="12" cy="16" r="1.5" fill={color} stroke="none" />
        </svg>
    );
}

export function IconEnvelope({ size = 18, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <polyline points="2,4 12,13 22,4" />
        </svg>
    );
}

export function IconMapPin({ size = 18, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M12 21c0 0-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}

export function IconClock({ size = 16, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
        </svg>
    );
}

export function IconFreeTag({ size = 16, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}

export function IconBellAlert({ size = 16, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    );
}

export function IconChevronRight({ size = 20, color = 'currentColor', stroke = 1.8 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={stroke} {...base}>
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}

