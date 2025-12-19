import { useQuery } from "@tanstack/react-query";
import { Base_URL } from '../config';

const fetchPetList = async ({ queryKey }) => {
    const [
        _key,
        { page = 1, limit = 10, q = '', species = '' },
    ] = queryKey;

    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (q) params.append('q', q);
    if (species) params.append('species', species);

    const response = await fetch(
        `${Base_URL}/pets?${params.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch pets');
    }

    return response.json();
};

const usePetList = (
    { page = 1, limit = 10, q = "", species = "" },
    queryOptions = {}
) => {
    return useQuery({
        queryKey: ["petList", { page, limit, q, species }],
        queryFn: fetchPetList,
        keepPreviousData: true,
        ...queryOptions,
    });
};

export default usePetList;
