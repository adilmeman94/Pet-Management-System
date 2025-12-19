import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import useAdminPetList from "../hooks/useAdminPetList";
import useCreatePet from "../hooks/useCreatePet";
import useUpdatePet from "../hooks/useUpdatePet";
import useDeletePet from "../hooks/useDeletePet";
import useAdminAdoptions from "../hooks/useAdminAdoptions";
import useUpdateAdoptionStatus from "../hooks/useUpdateAdoptionStatus";
import AdminPetForm from "../components/AdminPetForm";

export default function AdminDashboard() {
  const { data: pets = [] } = useAdminPetList();
  const { data: adoptions = [] } = useAdminAdoptions();

  const createPet = useCreatePet();
  const updatePet = useUpdatePet();
  const deletePet = useDeletePet();
  const updateAdoption = useUpdateAdoptionStatus();

  const [editPet, setEditPet] = useState(null);

  return (
    <Box p={3}>
      <Typography variant="h4">Admin Panel</Typography>

      {/* PET MANAGEMENT */}
      <Typography variant="h6" mt={3}>
        Manage Pets
      </Typography>

      <AdminPetForm
        key={editPet?._id || "create"}
        initialData={editPet}
        onSubmit={(pet) => {
          if (editPet) {
            updatePet.mutate({ id: editPet._id, pet });
          } else {
            createPet.mutate(pet);
          }
          setEditPet(null);
        }}
      />
      {pets.map((pet) => (
        <Card key={pet._id} sx={{ mb: 1 }}>
          <CardContent>
            {pet.name} ({pet.status})
            <Button onClick={() => setEditPet(pet)}>Edit</Button>
            <Button color="error" onClick={() => deletePet.mutate(pet._id)}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* ADOPTION MANAGEMENT */}
      <Typography variant="h6" mt={4}>
        Adoption Requests
      </Typography>

      {adoptions.map((a) => (
        <Card key={a._id} sx={{ mb: 1 }}>
          <CardContent>
            {a.pet.name} – {a.user.email} – {a.status}
            {a.status === "pending" && (
              <>
                <Button
                  onClick={() =>
                    updateAdoption.mutate({ id: a._id, status: "approved" })
                  }
                >
                  Approve
                </Button>
                <Button
                  color="error"
                  onClick={() =>
                    updateAdoption.mutate({ id: a._id, status: "rejected" })
                  }
                >
                  Reject
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
