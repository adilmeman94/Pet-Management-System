import { useMutation } from '@tanstack/react-query';
import { Base_URL } from '../config';

const __loginApi = async (loginData) => {
  const response = await fetch(`${Base_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

const useLogin = (mutationOptions = {}) => {
  return useMutation({
    mutationFn: (loginData) => __loginApi(loginData),
    ...mutationOptions,
  });
};

export default useLogin;
