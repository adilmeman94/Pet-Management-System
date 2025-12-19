import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import useLogin from '../hooks/useLogin';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate, isLoading } = useLogin({
    onSuccess: (data) => {
      login(data);
      navigate('/');
    },
  });

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5">Login</Typography>
      <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" onClick={() => mutate({ email, password })} disabled={isLoading}>
        Login
      </Button>
    </Box>
  );
}
