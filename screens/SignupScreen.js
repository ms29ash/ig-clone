import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import SignupForm from "../components/Signup/SignupForm";

const SignupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          st
          source={{
            uri: "https://png.pngtree.com/png-vector/20221018/ourlarge/pngtree-instagram-social-platform-icon-png-image_6315976.png",
            height: 80,
            width: 80,
          }}
        />
      </View>
      <SignupForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});
