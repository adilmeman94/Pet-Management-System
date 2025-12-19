import { useMutation } from '@tanstack/react-query';
import { Base_URL } from '../config';

const __registerApi = async (formData) => {
  const response = await fetch(`${Base_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

const useRegister = (mutationOptions = {}) => {
  return useMutation({
    mutationFn: (formData) => __registerApi(formData),
    ...mutationOptions,
  });
};

export default useRegister;
