import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const updatePetApi = async ({ id, pet, token }) => {
  const res = await fetch(`${Base_URL}/pets/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),
  });

  if (!res.ok) throw new Error('Update pet failed');
  return res.json();
};

const useUpdatePet = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pet }) =>
      updatePetApi({ id, pet, token: user?.token }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adminPets'] });
    },
  });
};

export default useUpdatePet;
