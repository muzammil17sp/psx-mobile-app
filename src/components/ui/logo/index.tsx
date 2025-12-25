import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import SvgComponent from "../svg/LogoSvg";

const LogoWithText = () => {
  return (
    <View style={styles.container}>
      <SvgComponent width={30} height={30} />
      <Text style={styles.text}>Finance</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4, 
  },
  text: {
    fontSize: 18,       
    marginLeft: 8,       
    fontWeight: "700",   
    color: "#F5F5F5",   
    letterSpacing: 0.5, 
  },
});

export default LogoWithText;