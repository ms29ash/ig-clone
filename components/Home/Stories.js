import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { Users } from "../../Data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Users.map((story, index) => {
          return (
            <View key={index} style={styles.story}>
              <Image source={{ uri: story.image }} style={styles.image} />
              <Text style={styles.user}>
                {story.user.length > 7
                  ? `${story.user.slice(0, 5).toLocaleLowerCase()}..`
                  : story.user.toLowerCase()}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Stories;
const styles = StyleSheet.create({
  story: {
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginLeft: 4,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  user: {
    color: "white",
  },
});
