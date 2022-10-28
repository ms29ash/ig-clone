import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import {
  collection,
  onSnapshot,
  where,
  limit,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const BottomTabs = ({ icons }) => {
  const [profilePic, setProfilePic] = useState("");
  const user = auth.currentUser;
  const getUserName = () => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "users"),
        where("owner_uid", "==", user.uid),
        limit(1)
      ),
      (snapshot) =>
        snapshot.docs.map((doc) => {
          setProfilePic(doc.data().profile_picture);
        })
    );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="horizontal" color="#151515" />
      <View style={styles.container}>
        {icons.map((icon, i) => {
          return (
            <Icon
              icon={icon}
              key={i}
              profilePic={profilePic}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          );
        })}
      </View>
    </View>
  );
};

const Icon = ({ icon, setActiveTab, activeTab, profilePic }) => {
  const profile_pic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{
          uri:
            icon.name === "Profile"
              ? profilePic
                ? profilePic
                : profile_pic
              : icon.name === activeTab
              ? icon.active
              : icon.inactive,
        }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : "",
          activeTab === "Profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    height: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: 1,
    borderColor: activeTab ? "#ff8501" : "#fff",
  }),
});
