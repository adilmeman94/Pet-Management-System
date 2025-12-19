import { useQuery } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const fetchMyAdoptions = async ({ queryKey }) => {
  const [, token] = queryKey;

  const response = await fetch(`${Base_URL}/adoptions/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch adoptions');
  }

  return response.json();
};

const useMyAdoptions = (queryOptions = {}) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['myAdoptions', user?.token],
    queryFn: fetchMyAdoptions,
    enabled: !!user?.token,
    ...queryOptions,
  });
};

export default useMyAdoptions;
