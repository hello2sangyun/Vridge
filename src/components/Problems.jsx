import React from 'react';
import { IconLanguage, IconDocument, IconShield } from './Icons';

const ICONS = [
    (color) => <IconLanguage size={28} color={color} />,
    (color) => <IconDocument size={28} color={color} />,
    (color) => <IconShield size={28} color={color} />,
];
const COLORS = ['#007A33', '#2563eb', '#dc2626'];

export default function Problems({ t }) {
    const { problems } = t;
    return (
        <section id="problems" style={{ background: '#f9fafb', padding: '96px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="section-tag">
                        <IconDocument size={14} color="#007A33" stroke={2} />
                        {problems.tag}
                    </div>
                    <h2 className="section-title" style={{ marginTop: '8px', whiteSpace: 'pre-line' }}>
                        {problems.title}
                    </h2>
                    <p className="section-sub" style={{ maxWidth: '480px', margin: '14px auto 0', whiteSpace: 'pre-line' }}>
                        {problems.sub}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                }}>
                    {problems.items.map(({ title, desc }, i) => (
                        <div
                            key={i}
                            style={{
                                background: '#fff', borderRadius: '20px', padding: '36px 32px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                                transition: 'all 0.22s ease', cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = COLORS[i];
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                                e.currentTarget.style.borderColor = '#e5e7eb';
                            }}
                        >
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '16px',
                                background: `${COLORS[i]}15`, color: COLORS[i],
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '24px',
                            }}>
                                {ICONS[i](COLORS[i])}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>
                                {title}
                            </h3>
                            <p style={{ fontSize: '0.9375rem', color: '#6b7280', lineHeight: '1.7' }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
