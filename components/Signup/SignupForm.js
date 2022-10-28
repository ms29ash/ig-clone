import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const SignupForm = ({ navigation }) => {
  const SignUp = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let docRef = await setDoc(doc(db, "users", userCredential.user.email), {
        owner_uid: userCredential.user.uid,
        username: username,
        profile_picture: await getRandomProfilePicture(),
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  };

  const getRandomProfilePicture = async () => {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    return data.results[0].picture.large;
  };

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to be at least 8 characters long"),
  });
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          SignUp(values.email, values.password, values.username);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
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
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#f2f2f2"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#446"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length > 2
                      ? "#f2f2f2"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#446"
                placeholder="Username"
                autoCapitalize="none"
                onBlur={handleBlur("username")}
                onChangeText={handleChange("username")}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length > 6
                      ? "#f2f2f2"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#446"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
              />
            </View>

            <TouchableHighlight
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
            <View style={styles.signupContainer}>
              <Text>Already have a account? </Text>
              <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
                <Text style={{ color: "#6BB0f5" }}>Login</Text>
                <Text></Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});
