import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
  TouchableHighlight,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { auth, db } from "../../firebase";

const LoginForm = ({ navigation }) => {
  const onLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      Alert.alert("Error", error.message, [
        {
          text: "SignUp",
          onPress: () => navigation.push("SignupScreen"),
          style: "cancel",
        },
        { text: "OK" },
      ]);
    }
  };

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to be at least 8 characters long"),
  });
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
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
                placeholder="Phone number, username or email"
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
            <View
              style={{ alignItems: "flex-end", fontSize: 10, marginBottom: 10 }}
            >
              <Text style={{ color: "#6BB0F5" }}>Forget Password?</Text>
            </View>
            <TouchableHighlight
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            <View style={styles.signupContainer}>
              <Text>Don't have a account? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6BB0f5" }}>Sign Up</Text>
                <Text></Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

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
