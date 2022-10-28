import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import BottomTabs from "../components/Home/BottomTabs";
import { Tabs } from "../Data/tabs";
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      collectionGroup(db, "posts"),
      orderBy("createdAt", "desc"),
      (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={{ marginBottom: 50 }}>
        <Stories />
        {Posts?.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </ScrollView>
      <BottomTabs icons={Tabs} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
