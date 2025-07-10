// "use client";

// import { useState, useEffect } from 'react';
// import { Consultant } from '@/types/types';
// import AuthService from '@/services/AuthService';

// export const useConsultants = () => {
//   const [consultants, setConsultants] = useState<Consultant[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCounsellors = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const counsellors = await AuthService.frontGetCounsellors();
//       setConsultants(counsellors.filter((c) => !c.isBlocked).slice(0, 3));
//     } catch (err: any) {
//       console.error('Error fetching counsellors:', err);
//       setError(err.message || 'Failed to fetch counsellors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCounsellors();
//   }, []);

//   return { consultants, loading, error, refetch: fetchCounsellors };
// };