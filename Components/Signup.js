import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import axios from 'axios';

const Signup = () => {
  const [authenticate, setAuthenticate] = useState(0);
  const [buttonMessage, setButtonMessage] = useState("Request OTP");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const Navigation = useNavigation();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    //send email for otp
    console.log(formData);
    if (authenticate === 0) {
      // Send email for OTP receiving
      if(formData.email == " " || formData.email == null) {
        return Alert.alert("email cannot be empty, please enter a valid email", [{text:"OK"}]);
      }
     else if(formData.email != " "){
      const response = await axios.post("https://bserver-259n.onrender.com/signup", {
        key: 0,
        email: formData.email,
      });

      if (response.data.key == 1) {
        setAuthenticate(1);
        setButtonMessage("verify otp");
        Alert.alert('OTP sent', "please enter the OTP sent to your mail id to verify your mail", [{text:"OK"},]);
      }
     }
    } else if (authenticate === 1) {
      //send otp details for user verification
      const response = await axios.post("https://bserver-259n.onrender.com/signup", {
        email: formData.email,
        otp: formData.otp,
        key: 1,
      });

      if (response.data.key == 1) {
        setAuthenticate(2);
        setButtonMessage("Signup");
        Alert.alert('Verified', "your email is verified and safe with us, please fill up details to finish signin up :)", [{text:"OK"},])
      }
    } else {
      // Display alert with filled-in details for verification
      const response = await axios.post("https://bserver-259n.onrender.com/signup", {
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });
      // Handle redirecting to home
      if (response.data.key == 1) {
        Alert.alert("Signup successful","Please Login to continue", [{text:"OK", onPress: () => Navigation.navigate("Login")},])
        Navigation.navigate('Home');
      } else {
       Alert.alert("Error", `${response.data.message}`, [{text:"OK"}]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ marginTop: 100, width:'90%',height: '80%' }}>
        <View
          style={styles.topContainer}
        >
          <Text style={styles.heading}>Signup</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "left", marginHorizontal: 10, }}>Welcome</Text>
        </View>
        <View
          style={{
            flex: 6,
            width: "80%",
  
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {authenticate < 3 && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="john@gmail.com"
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                style={styles.input}
              />
              <Text style={styles.helperText}>
                Email should be a valid email address.
              </Text>
            </View>
          )}
          {authenticate === 1 && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                placeholder="Enter OTP"
                value={formData.otp}
                onChangeText={(value) => handleChange("otp", value)}
                style={styles.input}
              />
              <Text style={styles.helperText}>
                OTP should be a valid OTP code.
              </Text>
            </View>
          )}
          {authenticate == 2 && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="John"
                value={formData.name}
                onChangeText={(value) => handleChange("name", value)}
                style={styles.input}
              />
              <Text style={styles.helperText}>
                Name should contain at least 3 characters.
              </Text>
            </View>
          )}
          {authenticate == 2 && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry={true}
                style={styles.input}
              />
              <Text style={styles.helperText}>
                Password should be at least 6 characters long.
              </Text>
            </View>
          )}
          {authenticate == 2 && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleChange("confirmPassword", value)}
                secureTextEntry={true}
                style={styles.input}
              />
              <Text style={styles.helperText}>
                Confirm password should match the password.
              </Text>
            </View>
          )}
        </View>
        <View>
        <Pressable
          style={{
            width: "80%",
            margin: 'auto',
            borderRadius: 2,
            backgroundColor: "#ff4c24",
            paddingHorizontal:10,
            paddingVertical:6,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize:18, fontWeight:500 }}>
            {buttonMessage}
          </Text>
        </Pressable>
        </View>
        <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already signed up?. Press here to</Text>
            <Pressable onPress={() => Navigation.navigate("Login")}>
              <Text style={styles.signupLink}>Login</Text>
            </Pressable>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth:1,
    width: "100%",
    backgroundColor: "beige",
    marginTop: 30,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    bottom:0,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 24,
    marginHorizontal:5,
    width: "90%",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6610f2",
    marginLeft: 4,
    marginVertical:10,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 5,
  },
  helperText: {
    fontSize: 12,
    color: "#666666",
  },
});

export default Signup;
