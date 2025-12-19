import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const deletePetApi = async ({ id, token }) => {
  const res = await fetch(`${Base_URL}/pets/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Delete failed');
  return res.json();
};

const useDeletePet = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      deletePetApi({ id, token: user?.token }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adminPets'] });
    },
  });
};

export default useDeletePet;
