import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Header from "../../components/Header";

const initialOrders = [
  { id: 1, status: 'En cours', items: ['Pizza', 'Salad'], total: 25.99 },
  { id: 2, status: 'Prêt à être livré', items: ['Burger', 'Fries'], total: 18.49 },
  // ... other initial orders
];

const Suivre = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTrackClick = (order) => {
    // Suppose you want to update the status of the selected order
    const updatedOrders = orders.map((o) =>
      o.id === order.id ? { ...o, status: 'En cours de livraison' } : o
    );

    setOrders(updatedOrders);
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Suivre Commande " />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro de Commande</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleTrackClick(order)} color="primary">
                    Suivre
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for tracking details */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Suivi de la Commande #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Status: {selectedOrder?.status}</Typography>
          <Typography variant="subtitle1">Articles:</Typography>
          <ul>
            {selectedOrder?.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Suivre;
