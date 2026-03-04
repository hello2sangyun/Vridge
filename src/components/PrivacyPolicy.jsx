import React from 'react';
import LegalLayout from './LegalLayout';

export default function PrivacyPolicy({ t }) {
    return (
        <LegalLayout title={t.legal.privacyTitle} t={t}>
            {t.legal.privacyContent}
        </LegalLayout>
    );
}
