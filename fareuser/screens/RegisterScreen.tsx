import * as React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Button } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  FontSize,
  Padding,
  Color,
  Border,
  FontFamily,
  Gap,
} from "../GlobalStyles";

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.registerScreen, styles.headerFlexBox]}>
      <View style={styles.headerParent}>
        <View style={[styles.header, styles.headerFlexBox]}>
          <Text style={styles.createAccount}>Create Account</Text>
          <Text style={styles.createAnAccount} numberOfLines={2}>
            Create an account so you can explore all the existing jobs
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <TextInput
              style={[styles.input, styles.inputSpaceBlock]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#626262"
            />
            <TextInput
              style={styles.inputSpaceBlock}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#626262"
            />
            <TextInput
              style={styles.inputSpaceBlock}
              placeholder="Confirm Password"
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#626262"
            />
          </View>
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.buttonFlexBox]}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.button1}>Sign up</Text>
            </Pressable>
            <Pressable
              style={[styles.button2, styles.buttonFlexBox]}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Button
                title="Already have an account"
                radius="5"
                iconPosition="left"
                type="clear"
                color="#494949"
                titleStyle={styles.button1Btn}
                onPress={() => navigation.navigate("LoginScreen")}
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
  inputSpaceBlock: {
    fontSize: FontSize.size_base,
    paddingBottom: Padding.p_xl,
    paddingRight: Padding.p_16xl,
    paddingTop: Padding.p_xl,
    paddingLeft: Padding.p_xl,
    backgroundColor: Color.colorGhostwhite,
    borderRadius: Border.br_3xs,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    width: 357,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonFlexBox: {
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_3xs,
    width: 357,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  createAccount: {
    fontSize: FontSize.size_11xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSlateblue,
    textAlign: "center",
  },
  createAnAccount: {
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    width: 326,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
  },
  header: {
    paddingHorizontal: 19,
    paddingVertical: 0,
    gap: Gap.gap_sm,
    alignSelf: "stretch",
  },
  input: {
    borderStyle: "solid",
    borderColor: Color.colorSlateblue,
    borderWidth: 2,
  },
  inputs: {
    gap: 26,
  },
  button1: {
    fontSize: FontSize.size_xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
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
    paddingHorizontal: Padding.p_xl,
  },
  actions: {
    gap: Gap.gap_lg,
  },
  form: {
    gap: Gap.gap_md,
    alignSelf: "stretch",
  },
  headerParent: {
    gap: 50,
    width: 357,
    justifyContent: "center",
    alignItems: "center",
  },
  registerScreen: {
    borderRadius: Border.br_31xl,
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
    paddingHorizontal: Padding.p_12xl,
    paddingVertical: 97,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
});

export default RegisterScreen;
