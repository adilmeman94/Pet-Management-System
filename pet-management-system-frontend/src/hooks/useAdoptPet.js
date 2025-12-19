import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const adoptPetApi = async ({ petId, token }) => {
    const response = await fetch(`${Base_URL}/adoptions/${petId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Adoption failed');
    }

    return response.json();
};

const useAdoptPet = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (petId) =>
            adoptPetApi({ petId, token: user?.token }),

        onMutate: async (petId) => {
            await queryClient.cancelQueries({ queryKey: ['petList'] });

            const previousPets = queryClient.getQueryData(['petList']);

            queryClient.setQueryData(['petList'], (old = []) =>
                old.map((pet) =>
                    pet._id === petId
                        ? { ...pet, _uiAdoptionStatus: 'pending' }
                        : pet
                )
            );

            return { previousPets };
        },

        onError: (_err, _petId, context) => {
            if (context?.previousPets) {
                queryClient.setQueryData(['petList'], context.previousPets);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['petList'] });
            queryClient.invalidateQueries({ queryKey: ['myAdoptions'] });
        },
    });
};

export default useAdoptPet;
