// hooks/useLoading.ts
import { useEffect, useState } from 'react';

export function useLoading(delay: number = 1000): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}
