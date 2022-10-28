import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

const Placeholder_img =
  "https://innovating.capital/wp-content/uploads/2021/05/vertical-placeholder-image.jpg";

const uploadPostSchema = Yup.object().shape({
  imgUrl: Yup.string().url().required("A URL is required."),
  caption: Yup.string().max(2200, "Caption had reached the character limit."),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(Placeholder_img);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});

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
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePic: doc.data().profile_picture,
          });
        })
    );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFirebase = async (imgUrl, caption) => {
    const unsubscribe = await addDoc(
      collection(db, "users", user.email, "posts"),
      {
        imgUrl: imgUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePic,
        owner_uid: user.uid,
        caption: caption,
        owner_email: user.email,
        createdAt: serverTimestamp(),
        likes_by_user: [],
        comments: [],
      },
      navigation.goBack()
    );
    return unsubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imgUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imgUrl, values.caption);

        ToastAndroid.show(
          "Your Post was submitted successfully",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          20,
          ToastAndroid.CENTER
        );
      }}
      validationSchema={uploadPostSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : Placeholder_img,
              }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                multiline={true}
                placeholder="write a caption..."
                onChangeText={handleChange("caption")}
                placeholderTextColor="gray"
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider orientation="vertical" color="#333333" width={1} />
          <TextInput
            style={{ color: "white", fontSize: 18, marginBottom: 10 }}
            placeholder="Enter image URL.."
            placeholderTextColor="gray"
            onBlur={handleBlur("imgUrl")}
            value={values.imgUrl}
            onChangeText={handleChange("imgUrl")}
            onChange={(e) => {
              setThumbnailUrl(e.nativeEvent.text);
            }}
          />
          {errors.imgUrl && (
            <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
              {errors.imgUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
