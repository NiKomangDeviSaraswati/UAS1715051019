import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
    Icon
} from "react-native-elements";

import Header from "./Header";

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Header judul={"HOME"} />
        <View style={styles.box1}>
          <Text style={styles.text}>Selamat Datang Di Aplikasi Apotek</Text>
        </View>
        <View style={styles.box2}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("ListObat")}
          >
            <Icon name="list" color="black" size={60} />
            <Text style={styles.text2}>List Obat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Icon name="person" color="black" size={60} />
            <Text style={styles.text2}>Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAD2",
  },
  box1: {
    //borderWidth: 1,
    marginTop: 80,
    marginBottom: 40,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  },
  box2: {
    //borderWidth: 1,
    marginTop: 70,
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    justifyContent: "center",
    height: 45,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
  buttonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F08080",
    marginBottom: 20,
    height: 100,
    borderRadius: 5,
    alignItems: "center",
    justifyContent:"center",
    width: 300
  },
  text: {
    fontSize: 18,
    color:"black",
   fontWeight: 'bold',
  },
  text2: {
    fontSize: 18,
    color: "black",
  },
});
export default Home;
