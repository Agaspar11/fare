import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  Padding,
  Border,
  FontFamily,
  FontSize,
  Color,
  Gap,
} from "../GlobalStyles";

const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.welcomeScreen}>
      <View style={styles.frameParent}>
        <View style={styles.generalSantosCitySealRemovParent}>
          <ImageBackground
            style={styles.generalSantosCitySealRemovIcon}
            resizeMode="center"
            source={require("../assets/gensan-logo.png")}
          />
          <View style={styles.texts}>
            <Text
              style={[
                styles.gensanTricycleFare,
                styles.gensanTricycleFareFlexBox,
              ]}
              numberOfLines={3}
            >
              Gensan Tricycle Fare Management System
            </Text>
            <Text
              style={[
                styles.setYourDistanation,
                styles.gensanTricycleFareFlexBox,
              ]}
              numberOfLines={2}
            >
              Set your distanation to know the fare. Enter your destination to
              calculate your fare.
            </Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <Pressable
            style={[styles.button, styles.buttonFlexBox]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={[styles.button1, styles.buttonTypo]}>Log in</Text>
          </Pressable>
          <Pressable
            style={[styles.button2, styles.buttonFlexBox]}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={[styles.button3, styles.buttonTypo]}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gensanTricycleFareFlexBox: {
    textAlign: "center",
    alignSelf: "stretch",
  },
  buttonFlexBox: {
    paddingVertical: Padding.p_mini,
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_3xs,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    fontWeight: "600",
  },
  generalSantosCitySealRemovIcon: {
    width: 268,
    height: 270,
  },
  gensanTricycleFare: {
    fontSize: 35,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorSlateblue,
    fontWeight: "600",
    textAlign: "center",
  },
  setYourDistanation: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
  },
  texts: {
    gap: 17,
    alignSelf: "stretch",
  },
  generalSantosCitySealRemovParent: {
    top: 0,
    gap: Gap.gap_md,
    left: 0,
    position: "absolute",
    width: 350,
    alignItems: "center",
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
  },
  button3: {
    color: "#0a0a0a",
  },
  button2: {
    backgroundColor: Color.colorWhite,
    paddingVertical: Padding.p_mini,
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_3xs,
  },
  actionButtons: {
    top: 603,
    gap: Gap.gap_lg,
    flexDirection: "row",
    left: 0,
    position: "absolute",
    width: 350,
  },
  frameParent: {
    height: 663,
    width: 350,
  },
  welcomeScreen: {
    borderRadius: Border.br_31xl,
    width: "100%",
    height: 926,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
});

export default WelcomeScreen;
