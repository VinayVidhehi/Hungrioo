import { StyleSheet, Text, View } from 'react-native'
import Footer from "./Footer";
import Header from "./Header";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Combo = () => {
  const navigation = useNavigation();

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
  return (
    <View style={styles.comboMainContainer}>
      <Header />
      <Text style={{textAlign:'center'}}>Combo</Text>
      <Footer onSectionChange={handleSectionChange} page={1} />
    </View>
  )
}

export default Combo

const styles = StyleSheet.create({
  comboMainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})