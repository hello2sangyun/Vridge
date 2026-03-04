import React from 'react';
import LegalLayout from './LegalLayout';

export default function TermsOfUse({ t }) {
    return (
        <LegalLayout title={t.legal.termsTitle} t={t}>
            {t.legal.termsContent}
        </LegalLayout>
    );
}
