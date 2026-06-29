import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const fetchFunctionRef = useRef(fetchFunction);
  fetchFunctionRef.current = fetchFunction;

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFunctionRef.current();
        if (!active) return;
        setData(result);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err.response?.data?.message || err.message);
        setData(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, refetchIndex]);

  const refetch = useCallback(() => {
    setRefetchIndex((i) => i + 1);
  }, []);

  return { data, loading, error, refetch };
};
