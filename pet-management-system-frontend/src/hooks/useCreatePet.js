import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const createPetApi = async ({ pet, token }) => {
  const res = await fetch(`${Base_URL}/pets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),
  });

  if (!res.ok) throw new Error('Create pet failed');
  return res.json();
};

const useCreatePet = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (pet) =>
      createPetApi({ pet, token: user?.token }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adminPets'] });
    },
  });
};

export default useCreatePet;
