import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import useRegister from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { mutate } = useRegister({
    onSuccess: () => navigate('/login'),
  });

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5">Register</Typography>
      <TextField label="Name" fullWidth margin="normal" onChange={e => setForm({ ...form, name: e.target.value })} />
      <TextField label="Email" fullWidth margin="normal" onChange={e => setForm({ ...form, email: e.target.value })} />
      <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setForm({ ...form, password: e.target.value })} />
      <Button fullWidth variant="contained" onClick={() => mutate(form)}>
        Register
      </Button>
    </Box>
  );
}
