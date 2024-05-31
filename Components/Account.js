import { Pressable, StyleSheet, Text, View, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const Navigation = useNavigation();
  const [login, setLogin] = useState(0);
  const [logout, setLogout] = useState(1);
  const [user, setUser] = useState("");

  useEffect(() => {
    checkLocallyStoredEmail();
    handleRemoveUser();
    console.log("logout is ", logout);
  }, [logout]);

  const checkLocallyStoredEmail = async () => {
    try {
      const checkEmail = await AsyncStorage.getItem("bfemail");
      if (checkEmail != undefined) {
        setLogin(1);
        setUser(checkEmail);
        console.log("");
      } else console.log("no locally stored email found");
    } catch (error) {
      console.log("error while reading from local storage");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "are you sure you wanna log out?", [
      {
        text: "Cancel",
        onPress: () => setLogout(1),
        style: "cancel",
      },
      { text: "Logout", onPress: () => setLogout(0) },
    ]);
  };

  async function handleRemoveUser() {
    if (logout == 0) {
      const response = await AsyncStorage.removeItem("bfemail");
      setLogin(0);
      console.log("response is ", response);
    } else {
      console.log("user is alive");
    }
  }

  const editUserProfile = async () => {};

  const handleSectionChange = (newSection) => {
    if (newSection == 0) {
      Navigation.navigate("Home");
    } else if (newSection == 1) {
      Navigation.navigate("Combo");
    } else if (newSection == 2) {
      Navigation.navigate("Cart");
    } else if (newSection == 3) {
      Navigation.navigate("Account");
    }
  };
  return (
    <View style={styles.homeMainContainer}>
      <Header />
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 50,
          marginBottom: 10,
        }}
      >
        <View style={styles.accountHeaderContainer}>
          {login === 0 && (
            <Pressable onPress={() => Navigation.navigate("Login")}>
              <Text>Login</Text>
            </Pressable>
          )}
          <Text
            style={{
              textAlign: "center",
              color: "#FF4C24",
              fontSize: 25,
              marginTop: 20,
            }}
          >
            Account
          </Text>
          {login === 1 && (
            <View style={{}}>
              <Text
                style={{
                  color: "#FF4C24",
                  fontSize: 40,
                  textAlign: "center",
                  borderColor: "gray",
                  borderWidth: 2,
                  borderRadius: 100,
                  width: 50,
                  height: 50,
                  marginTop: 15,
                  padding: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user.charAt(0)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            height: 4,
            width: "100%",
            backgroundColor: " #FF5733",
          }}
        ></View>
        {login == 1 && (
          <View style={styles.accountBodyContainer}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: "#e7e7e7",
                borderColor: "#ff4c24",
                borderWidth: 2,
                width: "90%",
                marginBottom: 50,
              }}
            >
              {/* Placeholder for the profile image */}
              <Pressable
                onPress={handleLogout}
                style={{
                  borderRadius: 2,
                  borderBottomWidth: 1,
                  width: "100%",
                  borderColor: "#ff4c24",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#3f3f3f",
                    fontSize: 20,
                  }}
                >
                  Log out
                </Text>
              </Pressable>
              <Pressable
                onPress={editUserProfile}
                style={{
                  borderRadius: 2,
                  borderBottomWidth: 1,
                  width: "100%",
                  borderColor: "#ff4c24",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#3f3f3f",
                    fontSize: 21,
                  }}
                >
                  Edit Profile
                </Text>
              </Pressable>
              {login == 1 && (
                <Pressable
                  onPress={editUserProfile}
                  style={{
                    borderRadius: 2,
                    borderBottomWidth: 1,
                    width: "100%",
                    borderColor: "#ff4c24",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 10,
                    marginVertical: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#3f3f3f",
                      fontSize: 21,
                    }}
                  >
                    Previous Orders
                  </Text>
                </Pressable>
              )}
                <Pressable
                  onPress={editUserProfile}
                  style={{
                    borderRadius: 2,
                    borderBottomWidth: 1,
                    width: "100%",
                    borderColor: "#ff4c24",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 10,
                    marginVertical: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#3f3f3f",
                      fontSize: 21,
                    }}
                  >
                    Favourites
                  </Text>
                </Pressable>
            </View>
          </View>
        )}
        <Text>Account Body</Text>
      </View>
      <Footer onSectionChange={handleSectionChange} page={3} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  homeMainContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff", // Adjust the background color as needed
    width: "100%",
  },
  accountHeaderContainer: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  accountBodyContainer: {
    flex: 11,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
