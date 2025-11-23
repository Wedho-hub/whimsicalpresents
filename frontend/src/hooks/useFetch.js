import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchFunctionRef = useRef(fetchFunction);
  const dependenciesRef = useRef(dependencies);

  // Update refs whenever they change
  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
    dependenciesRef.current = dependencies;
  }, [fetchFunction, dependencies]);

  useEffect(() => {
    if (!fetchFunctionRef.current) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFunctionRef.current();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = useCallback(() => {
    if (!fetchFunctionRef.current) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFunctionRef.current();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, refetch };
};
