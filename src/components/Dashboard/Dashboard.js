import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Divider,
  Select,
  Typography,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import moment from 'moment';
import { CSVLink } from 'react-csv';

const columns = [
  { id: 1, label: 'Product Name', minWidth: 100 },
  { id: 2, label: 'Customer Name', minWidth: 200 },
  { id: 3, label: 'Customer Address', minWidth: 200 },
  { id: 4, label: 'Customer City', minWidth: 100 },
  { id: 5, label: 'Customer Mobile', minWidth: 100 },
  { id: 6, label: 'Date', minWidth: 50 },
  { id: 7, label: 'Quantity', minWidth: 50 },
];

export default function Dashboard({ orders }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const myRef = useRef();

  function handleDateFilter(e) {
    e.preventDefault();
    let target = e.target.value;

    switch (target) {
      case '0':
        setFilteredOrders(orders);
        break;
      case '1':
        setFilteredOrders(
          orders.filter((x) =>
            moment(x.date).isAfter(moment().subtract(1, 'day'))
          )
        );
        break;
      case '2':
        setFilteredOrders(
          orders.filter((x) =>
            moment(x.date).isAfter(moment().subtract(1, 'week'))
          )
        );
        break;
      case '3':
        setFilteredOrders(
          orders.filter((x) =>
            moment(x.date).isAfter(moment().subtract(1, 'month'))
          )
        );
        break;
      default:
        setFilteredOrders(orders);
    }
  }

  function handleNameFilter(e) {
    e.preventDefault();
    let target = e.target.value;

    console.log('====================================');
    console.log(target);
    console.log('====================================');

    if (target !== '0') {
      setFilteredOrders(orders.filter((x) => x.productName.includes(target)));
      return;
    }

    setFilteredOrders(orders);
  }

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleDownload = async () => {
    await myRef.current.link.click();
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          m: '10px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: '700' }}>
            Total Orders:{filteredOrders.length}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          mt: '10px',
          display: 'flex',
          mx: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            flex: '1',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="date-filter">Date</InputLabel>
            <Select
              label="Date"
              id="date-filter"
              defaultValue="0"
              onChange={handleDateFilter}
            >
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="1">Today</MenuItem>
              <MenuItem value="2">1 week</MenuItem>
              <MenuItem value="3">1 month</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="name-filter">Product Name</InputLabel>
            <Select
              label="Product Name"
              id="name-filter"
              defaultValue={'0'}
              onChange={handleNameFilter}
            >
              <MenuItem value={'0'}>All</MenuItem>
              <MenuItem value={'capzic'}>Capzic</MenuItem>
              <MenuItem value={'neurite'}>Neurite</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flex: '1',
          }}
        >
          <Button variant="contained" onClick={handleDownload}>
            Export to CSV
          </Button>
          <CSVLink ref={myRef} filename="orders.csv" data={filteredOrders} />
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 570 }}>
        <Table stickyHeader={true} aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontWeight: '700' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow hover tabIndex={-1} key={order.id}>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.city}</TableCell>
                <TableCell>{order.mobile}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.quantity} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
