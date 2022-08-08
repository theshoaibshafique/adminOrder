import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from './firebase/Firebase';
import moment from 'moment';
function App() {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      await onSnapshot(collection(db, 'orders'), (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
    console.log('====================================');
    console.log(orders);
    console.log('====================================');
  };

  function compare(a, b) {
    if (moment(a.date).isBefore(moment(b.date))) {
      return 1;
    }
    if (moment(a.date).isAfter(moment(b.date))) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box>
      <Dashboard orders={orders.sort(compare)} />
    </Box>
  );
}

export default App;
