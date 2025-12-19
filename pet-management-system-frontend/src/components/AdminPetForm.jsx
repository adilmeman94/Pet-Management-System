import { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

export default function AdminPetForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    species: initialData?.species || '',
    breed: initialData?.breed || '',
    age: initialData?.age || '',
    status: initialData?.status || 'available',
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <TextField
        label="Name"
        value={form.name}
        onChange={handleChange('name')}
      />

      <TextField
        label="Species"
        value={form.species}
        onChange={handleChange('species')}
      />

      <TextField
        label="Breed"
        value={form.breed}
        onChange={handleChange('breed')}
      />

      <TextField
        label="Age"
        type="number"
        value={form.age}
        onChange={handleChange('age')}
      />

      <TextField
        select
        label="Status"
        value={form.status}
        onChange={handleChange('status')}
      >
        <MenuItem value="available">Available</MenuItem>
        <MenuItem value="adopted">Adopted</MenuItem>
      </TextField>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ alignSelf: 'center' }}
      >
        {initialData ? 'Update Pet' : 'Create Pet'}
      </Button>
    </Box>
  );
}
