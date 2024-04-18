import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AddCircleOutline, Delete, Edit, Search } from "@mui/icons-material";
import Header from '../../components/Header';
import axios from 'axios';

// const initialResto = [
//   {
//     id: 1,
//     nom: "Miam's",
//     email: "miamsSousse@gmail.com",
//     contact: "(216)52323073",
//     city: "Hammem sousse",
//     address: "Route de la plage hammem sousse,4050",
//     date: new Date().toLocaleDateString(),
//   },
// ];



const Liste = () => {
  const [listeResto, setListeResto] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:3004/users?role=resto', {
       
      });
      setListeResto(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };
  

  const handleAddClick = () => {
    setDialogOpen(true);
    setSelectedItem({}); // Clear selected item
  };

  const handleEditClick = (item) => {
    setDialogOpen(true);
    setSelectedItem(item);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3004/users/${id}`);
      setListeResto(listeResto.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };
  
    const updateRestaurant = async (newItem) => {
    try {
      await axios.put(`http://localhost:3004/users/${newItem._id}`, newItem);
      setListeResto(listeResto.map(item => item._id === newItem._id ? newItem : item));
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };
  
  const createRestaurant = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:3004/users/create-resto', newItem);
      setListeResto([...listeResto, response.data]);
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };
  
  const handleSave = async (newItem) => {
    try {
      if (selectedItem._id) {
        // Update existing restaurant
        await updateRestaurant(newItem);
      } else {
        // Create new restaurant
        await createRestaurant(newItem);
      }
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
    // Close the dialog after saving
    setDialogOpen(false);
  };
  
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/users/name/${searchTerm}`);
      // Check if the response data is an array or a single object
      const searchData = Array.isArray(response.data) ? response.data : [response.data];
      setListeResto(searchData);
    } catch (error) {
      console.error('Error searching restaurants:', error);
    }
  };
  
  

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Liste " subtitle="Liste des Restaurents" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box mb={{ xs: 2, sm: 0 }}>
          <TextField
            label="Rechercher un Restaurent"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={{ xs: 2, sm: 0 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleAddClick}
          >
            Ajouter un Restaurent
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>telephone</TableCell>
              <TableCell>email</TableCell>
              <TableCell>adresse</TableCell>
              <TableCell>dateInscription</TableCell>
              <TableCell>password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {listeResto.map((item) => (
    <TableRow key={item._id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.telephone}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.adresse}</TableCell>
      <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
      <TableCell>{item.password}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleEditClick(item)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDeleteClick(item._id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedItem.id ? "Modifier Restaurent" : "Ajouter Restaurent"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom Resto"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.name || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
          />
          <TextField
            label="Téléphone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.telephone || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, telephone: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.email || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
          />
         
          <TextField
            label="Adresse"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.adresse || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, adresse: e.target.value })}
          />
          <TextField
            label="Date d'inscription"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.dateInscription || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, dateInscription: e.target.value })}
          />

<TextField
  label="Role"
  variant="outlined"
  fullWidth
  margin="normal"
  value={selectedItem.role || ""}
  onChange={(e) => setSelectedItem({ ...selectedItem, role: e.target.value })}
/>

         <TextField
            label="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.password|| ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button color="primary" onClick={() => handleSave(selectedItem)}>
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Liste;
