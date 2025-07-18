'use client';

import React from 'react';
import Head from 'next/head';
import TherapyImprovementsSection from '@/components/user/improve-with-us/TherapyImprovementSecond';

const ExpertCounsellorsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Improve Your Mental Well-being | Melete</title>
        <meta
          name="description"
          content="Explore ways to improve your mental health through therapy, mindfulness, and guided self-help programs at Melete."
        />
        <meta
          name="keywords"
          content="mental well-being, self improvement therapy, mental health improvement, mindfulness programs, mental resilience"
        />
      </Head>

      <div className='pt-7'>
        <TherapyImprovementsSection />
      </div>
    </>
  );
};

export default ExpertCounsellorsPage;
