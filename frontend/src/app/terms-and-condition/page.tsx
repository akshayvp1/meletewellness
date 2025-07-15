'use client';

import Head from 'next/head';
import TermsAndConditions from '@/components/user/terms-and-conditions/TermsAndCondition';

export default function TermsAndCondition() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Melete Mental Health Platform</title>
        <meta
          name="description"
          content="Review Melete’s terms and conditions for using our mental health support services, including app features and website access."
        />
        <meta
          name="keywords"
          content="terms and conditions, mental health services terms, usage policy, user agreement, platform terms"
        />
      </Head>

      <div className="min-h-screen bg-white">
        <TermsAndConditions />
      </div>
    </>
  );
}
