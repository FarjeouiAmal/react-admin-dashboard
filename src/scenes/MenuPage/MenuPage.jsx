import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import { AddCircleOutline, Delete, Edit, Search } from "@mui/icons-material";
import Header from "../../components/Header";

const initialMenu = [
  { id: 2, category: "Pasta", subcategory: "Pasta Carbonara", price: 8.99 },
  { id: 3, category: "Pasta", subcategory: "Pasta Bolognese", price: 9.99 },
  { id: 4, category: "Pizza", subcategory: "Pizza Margherita", price: 7.99},
  { id: 5, category: "Pizza", subcategory: "Pizza Pepperoni", price: 10.99 },
  // ... other initial menu items
];

const MenuPage = () => {
  const [menu, setMenu] = useState(initialMenu);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddClick = () => {
    setDialogOpen(true);
    setSelectedItem({});
  };

  const handleEditClick = (item) => {
    setDialogOpen(true);
    setSelectedItem(item);
  };

  const handleDeleteClick = (id) => {
    setMenu(menu.filter((item) => item.id !== id));
  };

  const handleSave = (newItem) => {
    if (selectedItem.id) {
      setMenu(menu.map((item) => (item.id === selectedItem.id ? newItem : item)));
    } else {
      setMenu([...menu, { ...newItem, id: Date.now() }]);
    }
    setDialogOpen(false);
  };

  const handleSearch = () => {
    const filteredMenu = initialMenu.filter((item) =>
      item.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMenu(filteredMenu);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddSubcategory = () => {
    setDialogOpen(true);
    setSelectedItem({ category: selectedCategory, subcategory: "" });
  };

  const transformedMenu = menu.reduce((acc, item) => {
    const existingItem = acc.find((accItem) => accItem.category === item.category);

    if (existingItem) {
      existingItem.subcategoryArray.push(item.subcategory);
    } else {
      acc.push({ ...item, subcategoryArray: [item.subcategory] });
    }

    return acc;
  }, []);

  return (
    <Box m="20px">
      <Header title="Page Menu" subtitle="Gérer le Menu" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box mb={{ xs: 2, sm: 0 }}>
          <TextField
            label="Rechercher un repas"
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
            Ajouter un Repas
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Catégorie</TableCell>
              <TableCell>Sous-Catégorie</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {transformedMenu.map((item, index) => (
    <React.Fragment key={item.id}>
      <TableRow className={`mb-4`}>
        <TableCell>
          <Button onClick={() => handleCategoryClick(item.category)}>
            {item.category}
          </Button>
          {selectedCategory === item.category && (
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSubcategory}
              >
                Ajouter une Sous-Catégorie à {selectedCategory}
              </Button>
            </Box>
          )}
        </TableCell>
        <TableCell>
          {item.subcategoryArray.map((subcat, index) => (
            <div key={index}>{subcat}</div>
          ))}
        </TableCell>
        <TableCell>
          {item.subcategoryArray.map((index) => (
            <div key={index}>{item.price} dt</div>
          ))}
        </TableCell>
        <TableCell>
          {item.subcategoryArray.map((index) => (
            <div key={index}>
              <IconButton  color="success" onClick={() => handleEditClick(item)}>
                <Edit />
              </IconButton>
              <IconButton  color="error" onClick={() => handleDeleteClick(item.id)}>
                <Delete />
              </IconButton>
            </div>
          ))}
        </TableCell>
      </TableRow>
    </React.Fragment>
  ))}
</TableBody>

        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedItem.id ? "Modifier Repas" : "Ajouter Repas"}</DialogTitle>
        <DialogContent>
          {selectedItem.category && (
            <Typography variant="subtitle1" color="textSecondary">
              Catégorie: {selectedItem.category}
            </Typography>
          )}
          <TextField
            label="Catégorie"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.category || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
          />
          <TextField
            label="Sous-Catégorie"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.subcategory || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, subcategory: e.target.value })}
          />
          <TextField
            label="Prix"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.price || ""}
            onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
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

export default MenuPage;
