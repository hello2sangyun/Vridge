import React from 'react';
import { IconPin, IconTarget, IconChart, IconGlobe, IconLightning, IconShieldCheck, IconArrowRight } from './Icons';

const REASON_ICONS = [IconPin, IconTarget, IconChart, IconGlobe, IconLightning, IconShieldCheck];

export default function WhyVridge({ t }) {
    const { why } = t;

    return (
        <section id="why" style={{ background: '#f9fafb', padding: '96px 0' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                    gap: '72px', alignItems: 'center',
                }}>
                    {/* Left */}
                    <div>
                        <div className="section-tag">
                            <IconShieldCheck size={14} color="#007A33" stroke={2} />
                            {why.tag}
                        </div>
                        <h2 className="section-title" style={{ marginTop: '12px', marginBottom: '16px' }}>
                            {why.title}
                        </h2>
                        <p className="section-sub" style={{ marginBottom: '40px', whiteSpace: 'pre-line' }}>
                            {why.sub}
                        </p>

                        {/* Stats row */}
                        <div style={{ display: 'flex', marginBottom: '40px' }}>
                            {why.stats.map(({ num, label }, i) => (
                                <div key={label} style={{
                                    flex: 1, textAlign: 'center',
                                    borderRight: i < why.stats.length - 1 ? '1px solid #e5e7eb' : 'none',
                                    padding: '0 20px',
                                    paddingLeft: i === 0 ? '0' : '20px',
                                }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#007A33', letterSpacing: '-0.03em' }}>{num}</div>
                                    <div style={{ fontSize: '0.8125rem', color: '#6b7280', fontWeight: 500, marginTop: '4px' }}>{label}</div>
                                </div>
                            ))}
                        </div>

                        <a href="#consultation" className="btn-primary">
                            {why.cta}
                            <IconArrowRight size={16} color="#fff" />
                        </a>
                    </div>

                    {/* Right grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {why.items.map(({ title, desc }, i) => {
                            const Icon = REASON_ICONS[i];
                            return (
                                <div
                                    key={i}
                                    style={{
                                        background: '#fff', borderRadius: '16px', padding: '24px 20px',
                                        border: '1px solid #e5e7eb', transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = '#007A33';
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,122,51,0.12)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ color: '#007A33', marginBottom: '12px' }}>
                                        <Icon size={24} color="#007A33" />
                                    </div>
                                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>{title}</h4>
                                    <p style={{ fontSize: '0.8125rem', color: '#6b7280', lineHeight: '1.65' }}>{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
