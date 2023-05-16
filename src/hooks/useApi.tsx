import { useEffect, useState } from 'react';

export default function useApi(path: string) {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`/api${path}`);
      const data = await response.json();
      setResponse(data);
      setLoading(false);
    };

    fetchData();
  }, [path]);

  return {
    loading,
    response,
  }
}