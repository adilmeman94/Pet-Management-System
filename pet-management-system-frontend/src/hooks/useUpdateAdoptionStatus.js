import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Base_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const __updateStatusApi = async ({ id, status, token }) => {
    const response = await fetch(`${Base_URL}/adoptions/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        throw new Error('Status update failed');
    }

    return response.json();
};

const useUpdateAdoptionStatus = (mutationOptions = {}) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: ({ id, status }) =>
            __updateStatusApi({
                id,
                status,
                token: user?.token,
            }),
        ...mutationOptions,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAdoptions'] });
        },
    });

};


export default useUpdateAdoptionStatus;
