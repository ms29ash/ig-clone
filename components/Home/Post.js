import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import { PostFooterIcons } from "../../Data/posts";
import { auth, db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";

const Post = ({ post }) => {
  const handleLike = async (post) => {
    const currentLikeStatus = !post?.likes_by_user.includes(
      auth.currentUser.email
    );
    updateDoc(doc(db, "users", post.owner_email, "posts", post.id), {
      likes_by_user: currentLikeStatus
        ? arrayUnion(auth.currentUser.email)
        : arrayRemove(auth.currentUser.email),
    })
      .then(() => {
        console.log("Document Successfully updated");
      })
      .catch((error) => console.error("Error updating docs", error));
  };
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="horizontal" color="#151515" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter handleLike={handleLike} post={post} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: post.profile_picture }} style={styles.image} />
        <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
          {post.user}
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          marginRight: 5,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        ...
      </Text>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View style={{ width: "100%", height: 450 }}>
      <Image
        style={{ height: "100%", resizeMode: "cover" }}
        source={{ uri: post.imgUrl }}
      />
    </View>
  );
};

const PostFooter = ({ handleLike, post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post?.likes_by_user.includes(auth.currentUser.email)
                ? PostFooterIcons[0].likedImgUrl
                : PostFooterIcons[0].imageUrl,
            }}
          />
        </TouchableOpacity>
        <Icon
          imgStyle={styles.footerIcon}
          imageUrl={PostFooterIcons[1].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imageUrl={PostFooterIcons[2].imageUrl}
        />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Icon
          imgStyle={styles.footerIcon}
          imageUrl={PostFooterIcons[3].imageUrl}
        />
      </View>
    </View>
  );
};

const Icon = ({ imageUrl, imgStyle }) => {
  return (
    <TouchableOpacity>
      <Image style={imgStyle} source={{ uri: imageUrl }} />
    </TouchableOpacity>
  );
};

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_user.length} likes
    </Text>
  </View>
);
const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      {post.caption}
    </Text>
  </View>
);
const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5, flexDirection: "row" }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray", fontWeight: "600" }}>
        view{" "}
        {post.comments.length > 1
          ? `all ${post.comments.length} comments`
          : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) =>
  post.comments.map((comment, index) => {
    return (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white", fontWeight: "700" }}>
          {comment.user}
        </Text>
        <Text style={{ color: "white" }}> {comment.comment}</Text>
      </View>
    );
  });
export default Post;

const styles = StyleSheet.create({
  story: {
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 3,
    borderWidth: 3,
  },
  user: {
    color: "white",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
