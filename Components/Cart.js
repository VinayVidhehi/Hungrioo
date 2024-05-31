import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({ route }) => {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [isCartUpdated, setIsCartUpdated] = useState(false); // State to track cart updates
  const Navigation = useNavigation();

  useEffect(() => {
    fetchCartItems();
  }, [route]);

  const fetchCartItems = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("bfemail");
      if (!userEmail) {
        return;
      }
      setEmail(userEmail);
      const response = await axios.get(
        `https://bserver-259n.onrender.com/fetch-items-to-cart?email=${userEmail}`
      );
      setCart(response.data.items);
      setIsLoading(false); // Set loading status to false after fetching
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleSectionChange = (newSection) => {
    if (newSection === 0) {
      navigation.navigate("Orders");
    } else if (newSection === 1) {
      navigation.navigate("Viewitem");
    } else if (newSection === 2) {
      navigation.navigate("Additem");
    } else if (newSection === 3) {
      navigation.navigate("Account");
    }
  };
  
  const handleQuantityChange = (item, action) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      if (action === "increase") {
        updatedCart[index].quantity++;
      } else if (action === "decrease") {
        updatedCart[index].quantity--;
        if (updatedCart[index].quantity < 1) {
          updatedCart.splice(index, 1); // Remove item if quantity becomes zero
        }
      }
      setCart(updatedCart);
      setIsCartUpdated(true); // Set state to indicate cart update
    }
  };
  
  const handleOrderFood = async () => {
    Alert.alert("Order", "Are you sure you want to order items present in the cart?", [
      { text: "OK", onPress: () => placeOrder() },
      { text: "Cancel" },
    ]);
  };
  
  const placeOrder = async () => {
    try {
      const response = await axios.post('https://bserver-259n.onrender.com/order-items', {
        email,
      });
  
      if (response.data.key === 1) {
        Alert.alert("Order", `${response.data.message}`, [
          { text: "OK", onPress: () => Navigation.navigate("Order") }
        ]);
      } else {
        Alert.alert("Error", `${response.data.message}`, [{ text: "OK" }]);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  
  const handleDeleteCartItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
    setIsCartUpdated(true); // Set state to indicate cart update
  };
  
  const handleUpdateCart = async () => {
    try {
      await axios.post(
        "https://bserver-259n.onrender.com/update-cart",
        {
          email: email,
          cart: cart,
        }
      );
      Alert.alert("Cart", "Cart updated successfully, continue to order", [
        { text: "OK" },
      ]);
      setIsCartUpdated(false); // Reset state after updating cart
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.foodItem.image }} style={styles.foodImage} />
      <Text style={styles.foodName}>{item.foodItem.name}</Text>
      <View style={styles.quantityContainer}>
        {item.quantity > 1 && (
          <Pressable onPress={() => handleQuantityChange(item, "decrease")}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
        )}
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Pressable onPress={() => handleQuantityChange(item, "increase")}>
          <Text style={styles.quantityButton}>+</Text>
        </Pressable>
      </View>
      <View style={{ marginRight: 10 }}>
        <Text>$ {item.foodItem.price}</Text>
      </View>
      <Pressable onPress={() => handleDeleteCartItem(item)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {isLoading == false && <View style={styles.headerContainer}>
        <Text style={{ textAlign: 'center', marginRight: 200, fontSize: 12, color: 'gray' }}>items</Text>
        <Text style={{ textAlign: "center", fontSize: 12, color: 'gray' }}>quantity</Text>
        <Text style={{ textAlign: "center", fontSize: 12, color: 'gray' }}>price</Text>
        <Text style={{ textAlign: "center", fontSize: 12, color: 'gray' }}>remove</Text>
      </View>}
      {isLoading ? ( // Show Activity Indicator while loading cart items
        <ActivityIndicator style={styles.activityIndicator} size="large" color="green" />
      ) : (
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          style={styles.cartList}
        />
      )}
      {!isLoading && cart.length > 0 && ( // Show Order button if cart is not empty and loaded
        <View style={{marginBottom:60, width:'80%'}}>
          {isCartUpdated && ( // Show Update button if the cart is updated
          <Pressable onPress={handleUpdateCart} style={{ borderWidth:1, borderColor:'#FF4C24', paddingVertical:5, marginBottom:5}}>
            <Text style={{textAlign: 'center', color:'#FF4C24', fontSize:22, fontWeight:500}}>Update Cart</Text>
          </Pressable>
          )}
          <Pressable onPress={handleOrderFood} style={{ borderWidth:1, borderColor:'#FF4C24', paddingVertical:5, marginBottom:10}}>
            <Text style={{textAlign: 'center', color:'#FF4C24', fontSize:22, fontWeight:500}}>Order</Text>
          </Pressable>
        </View>
      )}
     <Footer onSectionChange={handleSectionChange} page={2} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    top: 45,
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
  },
  userInitial: {
    fontSize: 24,
    color: "#fff",
  },
  activityIndicator: {
    marginTop: 20,
  },
  cartList: {
    marginTop: 25,
    width: "100%",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  foodImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginRight: 10,
  },
  quantityButton: {
    textAlign: 'center',
    fontSize: 20,
    width:25,
    borderWidth: 1,
    borderColor: '#FF4C24',
    borderRadius: 8,
    color: "green",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  deleteButton: {
    fontSize: 16,
    color: "red",
    marginLeft: 10,
  },
  updateButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10,
    top:300
  },
  updateButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    bottom:150,
  },
  orderButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
