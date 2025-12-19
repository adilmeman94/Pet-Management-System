import { useQuery } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const fetchAllAdoptions = async ({ queryKey }) => {
  const [, token] = queryKey;

  const response = await fetch(`${Base_URL}/adoptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch admin adoptions');
  }

  return response.json();
};

const useAdminAdoptions = (queryOptions = {}) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['adminAdoptions', user?.token],
    queryFn: fetchAllAdoptions,
    enabled: user?.role === 'admin' && !!user?.token,
    ...queryOptions,
  });
};


export default useAdminAdoptions;
