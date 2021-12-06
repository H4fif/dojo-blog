import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) throw Error('failed to load data for that resource');
        return res.json();
      })
      .then((data) => {
        setError(null);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted', err.name);
        } else {
          setLoading(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  }, []);

  return { data, isLoading, error };
};

export default useFetch;
