import React, { useState } from 'react';
import { IconBriefcase, IconBuilding, IconPeople, IconRefresh, IconArrowRight, IconCheck } from './Icons';

const SERVICE_ICONS = [IconBriefcase, IconBuilding, IconPeople, IconRefresh];
const SERVICE_COLORS = ['#007A33', '#2563eb', '#7c3aed', '#d97706'];

export default function Services({ t }) {
    const [hovered, setHovered] = useState(null);
    const { services } = t;

    return (
        <section id="services" style={{ background: '#fff', padding: '96px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="section-tag">
                        <IconBriefcase size={14} color="#007A33" stroke={2} />
                        {services.tag}
                    </div>
                    <h2 className="section-title" style={{ marginTop: '8px' }}>{services.title}</h2>
                    <p className="section-sub" style={{ maxWidth: '480px', margin: '14px auto 0' }}>{services.sub}</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '20px',
                }}>
                    {services.items.map(({ title, desc, details }, i) => {
                        const Icon = SERVICE_ICONS[i];
                        const color = SERVICE_COLORS[i];
                        const isHovered = hovered === i;
                        const badge = i === 0 ? services.badge1 : i === 1 ? services.badge2 : null;
                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    background: isHovered ? '#007A33' : '#fff',
                                    border: `1.5px solid ${isHovered ? '#007A33' : '#e5e7eb'}`,
                                    borderRadius: '20px', padding: '32px 28px',
                                    transition: 'all 0.25s ease', cursor: 'pointer', position: 'relative',
                                    boxShadow: isHovered ? '0 20px 48px rgba(0,122,51,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                                }}
                            >
                                {badge && (
                                    <div style={{
                                        position: 'absolute', top: '20px', right: '20px',
                                        padding: '4px 12px',
                                        background: isHovered ? 'rgba(255,255,255,0.18)' : `${color}15`,
                                        color: isHovered ? '#fff' : color,
                                        borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
                                        border: isHovered ? '1px solid rgba(255,255,255,0.25)' : 'none',
                                        transition: 'all 0.25s ease',
                                    }}>{badge}</div>
                                )}

                                {/* Icon box */}
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '14px',
                                    background: isHovered ? 'rgba(255,255,255,0.18)' : `${color}12`,
                                    color: isHovered ? '#fff' : color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '20px', transition: 'all 0.25s ease',
                                }}>
                                    <Icon size={26} color={isHovered ? '#fff' : color} />
                                </div>

                                <h3 style={{
                                    fontSize: '1.125rem', fontWeight: 700, marginBottom: '10px',
                                    color: isHovered ? '#fff' : '#111827', transition: 'color 0.25s ease',
                                }}>{title}</h3>

                                <p style={{
                                    fontSize: '0.875rem', lineHeight: '1.65',
                                    color: isHovered ? 'rgba(255,255,255,0.78)' : '#6b7280',
                                    marginBottom: '24px', transition: 'color 0.25s ease',
                                }}>{desc}</p>

                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {details.map(d => (
                                        <li key={d} style={{
                                            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem',
                                            color: isHovered ? 'rgba(255,255,255,0.88)' : '#374151',
                                            transition: 'color 0.25s ease',
                                        }}>
                                            <div style={{ flexShrink: 0 }}>
                                                <IconCheck size={14} color={isHovered ? '#4ade80' : '#007A33'} />
                                            </div>
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', marginBottom: '20px' }}>{services.noIdea}</p>
                    <a href="#consultation" className="btn-primary">
                        {services.cta}
                        <IconArrowRight size={16} color="#fff" />
                    </a>
                </div>
            </div>
        </section>
    );
}
