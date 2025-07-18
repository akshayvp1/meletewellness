


"use client";

import { useState, useEffect } from 'react';
import CounsellorDataService from '@/services/user/CounsellorDataService';
import { Consultant } from '../../types/types';

export const useCounsellors = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        setLoading(true);
        const response: Consultant[] = await CounsellorDataService.frontGetCounsellors();
        const activeConsultants = response.filter((c) => !c.isBlocked);
        setConsultants(activeConsultants);
        setTotalCount(activeConsultants.length);
      } catch (err: any) {
        console.error('Error fetching counsellors:', err);
        setError(err.message || 'Failed to fetch counsellors');
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellors();
  }, []);

  return { consultants, loading, error, totalCount };
};
