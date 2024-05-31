import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Footer = ({ onSectionChange, page }) => {
  console.log("page value is ",page);

  const handlePress = (newSection) => {
    onSectionChange(newSection); // Call the parent component's function to update the section
  };

  return (
    <View style={{ flexDirection: 'row',backgroundColor: '#FF4C24', alignItems: 'center', position: 'absolute', bottom: 0, maxWidth:350 }}>
      <Pressable style={{ flex: 1, opacity: page === 0 ? 1 : 0.5 }} onPress={() => handlePress(0)}>
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <MaterialCommunityIcons name={page === 0 ? 'home' : 'home-outline'} size={24} color="lightgray" />
          <Text style={{ color: 'lightgray', fontSize: 12 }}>
            Home
          </Text>
        </View>
      </Pressable>
      <Pressable style={{ flex: 1, opacity: page === 1 ? 1 : 0.5 }} onPress={() => handlePress(1)}>
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        <Foundation name="video" size={24} color="lightgray" />
          <Text style={{ color: 'lightgray', fontSize: 12 }}>
            Reels
          </Text>
        </View>
      </Pressable>
      <Pressable style={{ flex: 1, opacity: page === 2 ? 1 : 0.6 }} onPress={() =>  handlePress(2)}>
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <MaterialCommunityIcons name={page === 2 ? 'cart' : 'cart-outline'} size={24} color="lightgray" />
          <Text style={{ color: 'lightgray', fontSize: 12 }}>
            Cart
          </Text>
        </View>
      </Pressable>
      <Pressable style={{ flex: 1, opacity: page === 3 ? 1 : 0.5 }} onPress={() =>  handlePress(3)}>
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <MaterialCommunityIcons name={page === 3 ? 'account' : 'account-outline'} size={24} color="lightgray" />
          <Text style={{ color: 'lightgray', fontSize: 12 }}>
            Account
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Footer;
