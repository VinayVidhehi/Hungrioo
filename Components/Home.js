import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

import axios from 'axios';

const SearchBar = () => {
  return (
    <View style={{ width: '100%', zIndex: 1, height: 40, top: 70 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderRadius: 4, borderWidth: 1, borderColor: 'gray', backgroundColor: '#fff' }}>
        <MaterialIcons name="search" size={24} color="gray" style={{ marginLeft: 5 }} />
        <TextInput placeholder="Search food and find your love" style={{ flex: 1, fontSize: 14, paddingVertical: 10, paddingHorizontal: 5 }} />
        <MaterialIcons name="mic" size={24} color="gray" style={{ marginRight: 5 }} />
      </View>
    </View>
  );
};

const FoodCard = ({ food }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.foodCard}>
      <Pressable onPress={() => navigation.navigate('Item', { state: { food } })}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
        <Text>{food.name}</Text>
      </Pressable>
    </View>
  );
};

const Home = ({ route }) => {
  const [foodItems, setFoodItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('https://bserver-259n.onrender.com/fetch-foods');
      setFoodItems(response.data.foods);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const handleSectionChange = (newSection) => {
    if (newSection == 0) {
      navigation.navigate("Home");
    } else if (newSection == 1) {
      navigation.navigate("Combo");
    } else if (newSection == 2) {
      navigation.navigate("Cart");
    } else if (newSection == 3) {
      navigation.navigate("Account");
    }
  };

  const categories = [
    { id: 1, name: 'Pure Veg', image: 'https://b.zmtcdn.com/data/collections/8ea321c04135aacaac89eddb10ef64bd_1688552905.jpg?fit=around|562.5:360&crop=562.5:360;*,*', route: 'PureVeg' },
    { id: 2, name: 'Non Veg', image: 'https://t3.ftcdn.net/jpg/06/48/92/52/360_F_648925212_QYHo0OCN9Va3UvfWOEtpHM43A6lE1lSV.jpg', route: 'NonVeg' },
    { id: 3, name: 'Rolls', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Veggie-Spring-Rolls.jpg', route: 'Rolls' },
    { id: 4, name: 'Noodles', image: 'https://www.justspices.co.uk/media/recipe/Egg-Fried-Noodles_Chinese_Allrounder.webp', route: 'Rolls' },
    { id: 5, name: 'Pasta', image: 'https://images.aws.nestle.recipes/resized/52007da8aee0c1d4cdb98e2e5c9b03cd_Maggi_-_Easy_Creamy_Chicken_Pasta_1080_850.jpg', route: 'Rolls' },
    // Add more categories as needed
  ];

  return (
    <View style={styles.homeMainContainer}>
      <Header />
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={{top:90}}>
        <Text style={{fontSize:35, fontWeight:800, textAlign:"left", paddingHorizontal: 20, color: '#FF4C24'}}>Categories</Text>
      <ScrollView horizontal style={styles.categoryScroll} contentContainerStyle={styles.categoryScrollContent} showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <Pressable key={category.id} onPress={() => navigation.navigate(category.route)} style={styles.categoryContainer}>
            <Image source={{ uri: category.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={{ marginTop: 20, marginBottom: 0, fontSize:28, textAlign: 'center', fontWeight: 700, color: '#FF4C24' }}>Top rated crafted for you!</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {foodItems.map((food, index) => (
          <FoodCard key={index} food={food} />
        ))}
      </ScrollView>
      </View>
      <Footer onSectionChange={handleSectionChange} page={0} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeMainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    marginTop: 25,
    width: "80%",
    zIndex: 1,
  },
  categoryScroll: {
    height:'20%',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryScrollContent: {
    
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  categoryContainer: {

    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 0,
    marginTop: 20,
  },
  foodCard: {
    width: '48%', // Adjust the width as needed
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    top: 150,
  },
  foodImage: {
    width: '100%',
    height: 100, // Adjust the height as needed
    borderRadius: 10,
    marginBottom: 10,
  },
});
