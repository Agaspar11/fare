import * as React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Button } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  FontFamily,
  FontSize,
  Padding,
  Color,
  Border,
  Gap,
} from "../GlobalStyles";

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.loginScreen, styles.headerFlexBox]}>
      <View style={styles.headerParent}>
        <View style={[styles.header, styles.headerFlexBox]}>
          <Text style={styles.loginHere} numberOfLines={1}>
            Login here
          </Text>
          <Text
            style={[styles.welcomeBackYouve, styles.button1Typo]}
            numberOfLines={2}
          >{`Welcome back you’ve
been missed!`}</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <TextInput
              style={[styles.input, styles.inputSpaceBlock]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={false}
              placeholderTextColor="#626262"
            />
            <TextInput
              style={styles.inputSpaceBlock}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#626262"
            />
          </View>
          <Button
            title="Forgot your password?"
            radius="5"
            iconPosition="left"
            type="clear"
            color="#1f41bb"
            titleStyle={styles.forgotYourPasswordBtn}
            containerStyle={styles.forgotYourPasswordBtn1}
            buttonStyle={styles.forgotYourPasswordBtn2}
          />
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.buttonFlexBox]}
              onPress={() => navigation.navigate("WelcomeScreen1")}
            >
              <Text style={[styles.button1, styles.button1Typo]}>Log in</Text>
            </Pressable>
            <Pressable
              style={[styles.button2, styles.buttonFlexBox]}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Button
                title="Create new account"
                radius="5"
                iconPosition="left"
                type="clear"
                color="#494949"
                titleStyle={styles.button1Btn}
                onPress={() => navigation.navigate("RegisterScreen")}
                containerStyle={styles.button1Btn1}
                buttonStyle={styles.button1Btn2}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotYourPasswordBtn: {
    color: "#1f41bb",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  forgotYourPasswordBtn1: {
    position: "relative",
  },
  forgotYourPasswordBtn2: {},
  button1Btn: {
    color: "#494949",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  button1Btn1: {
    position: "relative",
  },
  button1Btn2: {},
  headerFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  button1Typo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  inputSpaceBlock: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    paddingBottom: Padding.p_xl,
    paddingRight: Padding.p_16xl,
    paddingTop: Padding.p_xl,
    paddingLeft: Padding.p_xl,
    flexDirection: "row",
    backgroundColor: Color.colorGhostwhite,
    borderRadius: Border.br_3xs,
    width: 357,
    alignItems: "center",
  },
  buttonFlexBox: {
    paddingHorizontal: Padding.p_xl,
    flexDirection: "row",
    borderRadius: Border.br_3xs,
    width: 357,
    justifyContent: "center",
    alignItems: "center",
  },
  loginHere: {
    fontSize: FontSize.size_11xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSlateblue,
    textAlign: "center",
    alignSelf: "stretch",
  },
  welcomeBackYouve: {
    color: Color.colorBlack,
    alignSelf: "stretch",
  },
  header: {
    gap: Gap.gap_md,
    alignSelf: "stretch",
  },
  input: {
    borderStyle: "solid",
    borderColor: Color.colorSlateblue,
    borderWidth: 2,
  },
  inputs: {
    gap: 29,
  },
  button1: {
    color: Color.colorWhite,
  },
  button: {
    shadowColor: "#cbd6ff",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    backgroundColor: Color.colorSlateblue,
    paddingVertical: Padding.p_mini,
  },
  button2: {
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.colorWhite,
  },
  actions: {
    gap: Gap.gap_lg,
  },
  form: {
    alignItems: "flex-end",
    gap: Gap.gap_lg,
  },
  headerParent: {
    height: 575,
    justifyContent: "flex-end",
    gap: 81,
    width: 357,
    alignItems: "center",
  },
  loginScreen: {
    borderRadius: Border.br_31xl,
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
    paddingHorizontal: Padding.p_12xl,
    paddingVertical: 96,
    backgroundColor: Color.colorWhite,
  },
});

export default LoginScreen;
