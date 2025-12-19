import { useMemo, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  Pagination,
} from "@mui/material";

import usePetList from "../hooks/usePetList";
import useAdoptPet from "../hooks/useAdoptPet";
import useMyAdoptions from "../hooks/useMyAdoptions";
import { useAuth } from "../context/AuthContext";

const PER_PAGE = 10;

export default function PetList() {
  const { user } = useAuth();

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  //  Fetch paginated pets
  const { data: pets = [], isFetching } = usePetList({
    q,
    page,
    limit: PER_PAGE,
  });

  //  Fetch user adoptions
  const { data: myAdoptions = [] } = useMyAdoptions({
    enabled: user?.role === "user",
  });

  const { mutate: adoptPet, isLoading } = useAdoptPet();

  //  Build lookup: petId -> adoptionStatus
  const adoptionStatusMap = useMemo(() => {
    const map = {};
    myAdoptions.forEach((adoption) => {
      map[adoption.pet._id] = adoption.status;
    });
    return map;
  }, [myAdoptions]);

  const getStatusChip = (pet) => {
    const adoptionStatus = adoptionStatusMap[pet._id];

    if (adoptionStatus === "pending") {
      return <Chip label="Pending Approval" color="warning" />;
    }

    if (adoptionStatus === "approved" || pet.status === "adopted") {
      return <Chip label="Adopted" color="success" />;
    }

    if (adoptionStatus === "rejected") {
      return <Chip label="Rejected" color="error" />;
    }

    return <Chip label="Available" color="primary" />;
  };

  const canAdopt = (pet) => {
    if (!user || user.role !== "user") return false;
    if (pet.status === "adopted") return false;
    if (adoptionStatusMap[pet._id]) return false;
    return true;
  };

  return (
    <>
      {/* Search */}
      <Box mt={5} mb={5}>
        <TextField
          fullWidth
          label="Search Pets"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1); // reset page on search
          }}
        />
      </Box>

      {/* Pet Cards */}
      <Grid container spacing={2}>
        {pets.map((pet) => (
          <Grid item xs={12} md={4} key={pet._id}>
            <Card variant="outlined" sx={{ height: "100%" , width: "200px"}}>
              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography color="text.secondary">
                  Breed: {pet.breed}
                </Typography>

                <Box mt={1} mb={2}>
                  {getStatusChip(pet)}
                </Box>

                {canAdopt(pet) && (
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    onClick={() => adoptPet(pet._id)}
                  >
                    Adopt
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          page={page}
          count={pets.length < PER_PAGE ? page : page + 1}
          onChange={(_, value) => setPage(value)}
          disabled={isFetching}
        />
      </Box>
    </>
  );
}
