import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IconArrowRight } from './Icons';

export default function LegalLayout({ title, children, t }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '120px 0 80px' }}>
            <Helmet>
                <title>{title} | Vridge</title>
                <meta name="description" content={`Vridge - ${title}`} />
            </Helmet>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    color: '#007A33', fontWeight: 600, fontSize: '0.9375rem',
                    marginBottom: '32px', textDecoration: 'none'
                }}>
                    <IconArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                    {t.legal.back}
                </Link>
                <div style={{
                    background: '#fff', padding: '60px', borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e5e7eb'
                }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '40px' }}>{title}</h1>
                    <div style={{
                        color: '#4b5563', lineHeight: 1.8, fontSize: '1rem',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
