import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Modal } from 'react-native';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("bfemail");
      const response = await axios.get(`https://bserver-259n.onrender.com/fetch-orders?email=${userEmail}`);
      setOrders(response.data.userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const renderOrderItem = ({ item }) => (
    <Pressable style={styles.orderItem} onPress={() => handleOrderPress(item)}>
      <Text style={styles.orderInfo}>Order ID: {item._id}</Text>
      <Text style={styles.orderInfo}>Total Items: {item.cart.length}</Text>
      <Text style={styles.orderInfo}>Order Date: {new Date(item.createdAt).toLocaleString()}</Text>
    </Pressable>
  );

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        style={styles.orderList}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.orderInfo}>Order Details</Text>
            {selectedOrder && selectedOrder.cart.map((item, index) => (
              <View key={index}>
                <Text style={styles.orderInfo}>Food: {item.foodItem.name}</Text>
                <Text style={styles.orderInfo}>Quantity: {item.quantity}</Text>
                {/* Add more details as needed */}
              </View>
            ))}
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:30
  },
  orderList: {
    marginTop:50,
    padding: 10,
  },
  orderItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  orderInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
