import { useQuery } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const fetchPets = async ({ queryKey }) => {
  const [, token] = queryKey;

  const res = await fetch(`${Base_URL}/pets`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch pets');
  return res.json();
};

const useAdminPetList = (options = {}) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['adminPets', user?.token],
    queryFn: fetchPets,
    enabled: user?.role === 'admin',
    ...options,
  });
};

export default useAdminPetList;
