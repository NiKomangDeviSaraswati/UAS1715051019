import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = props => {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerText}> {props.judul} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: "#F08080",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    //marginTop: 20,
    position: "relative",
    height: 60,
    width: 360
    //borderWidth: 1
  },
  headerText: {
    fontSize: 28,
    color: "black",
    textAlign: "center"
  }
});
export default Header;
