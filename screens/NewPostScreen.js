import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import AddNewPost from "../components/AddNewPost/AddNewPost";

export default function NewPostScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "black",
  },
});
