import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ route }) => {
  const [buttonMessage, setButtonMessage] = useState("Add to Cart");
  const [email, setEmail] = useState("");
  const { food } = route.params.state;

  const Navigation = useNavigation();

  useEffect(() => {
  handleFoodItemRender();
  },[]);

  const handleFoodItemRender = async() => {
      const userEmail = await AsyncStorage.getItem("bfemail");
      console.log("user mail is", userEmail);
      if(userEmail == undefined) {
        setButtonMessage("login to order");
      } else {
        setEmail(userEmail);
      }
  }

  const handleAddToCartNotificationAlert  = () => {
    Alert.alert('successfull',`${food.name} added to cart`,[{ text: "OK", onPress: () => Navigation.navigate("Cart") },])
  }

  const handleAddToCart = async() => {
    if(email == " ") {
      Navigation.navigate('Login');
    }
    else{
      // Implement your add to cart logic here
       const response = await axios.post('https://bserver-259n.onrender.com/add-to-cart', {
        email,
        food,
       })
       console.log(response.data.message, "response key is ", response.data.key);
       if(response.data.key == 1){
        handleAddToCartNotificationAlert();
       }
    }
  };

  return (
    <View style={styles.container}>
        <Header />
      <View style={styles.content}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{food.name}</Text>
          <Text style={styles.category}>Category: {food.category}</Text>
          <Text style={styles.price}>Price: <Text style={styles.priceValue}>${food.price}</Text></Text>
          <Text style={styles.label}>Ingredients:</Text>
          {food.ingredients.map((ingredient, index) => (
            <Text style={styles.value} key={index}>{ingredient}</Text>
          ))}
          <Text style={styles.label}>Allergens:</Text>
          {food.allergens.map((allergen, index) => (
            <Text style={styles.value} key={index}>{allergen}</Text>
          ))}
          <Text style={styles.label}>Calories: <Text style={styles.value}>{food.calories}</Text></Text>
          <Text style={styles.label}>Origin: <Text style={styles.value}>{food.origin}</Text></Text>
        </View>
      </View>
      <Pressable onPress={handleAddToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>{buttonMessage}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop:30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  details: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF4C24',
  },
  category: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: '#999',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#FF4C24',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Item;
