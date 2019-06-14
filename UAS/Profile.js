import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList
} from "react-native";
import { Icon, Card, Divider } from "react-native-elements";
const axios = require("axios");
import Header from "./Header";
class Profile extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      kode_user: ''
    };
  };
  componentDidMount(){
    axios.get("https://deviundiksha.000webhostapp.com/apotik/getDetailUser.php?kode_user=1")
    .then((response)=>{
      console.log(response.data);
      this.setState({ data:response.data });
    })
    .catch(function (error) {
    // handle error
    console.log(error);
  });
}
  render() {
    return (
      <View style={styles.container}>
        <Header judul={"PROFILE"} />
        <View style={styles.box1}>
              <View style={styles.image}>
                <Image
                  source={{
                    uri:
                      "https://deviundiksha.000webhostapp.com/apotik/img/devi.jpeg"
                  }}
                  style={styles.image}
                />
              </View>
            </View>
            <View style={styles.box2}>
              <Text style={styles.profile}>Profile</Text>
              <View style={styles.box3} />
              <View style={styles.box3}>
                <Text>Username </Text>
                <Text>devisaraswati</Text>
              </View>
              <View style={styles.box3}>
                <Text>Nama </Text>
                <Text>Devi Saraswati</Text>
              </View>
              <View style={styles.box3}>
                <Text>Alamat </Text>
                <Text>Tabanan</Text>
              </View>
              <View style={styles.box3}>
                <Text>Email </Text>
                <Text>dswati26@undiksha.ac.id</Text>
              </View>
              <View style={styles.box3}>
                <Text>No Hp </Text>
                <Text>0857</Text>
              </View>
            </View>

        <View style={styles.box4}>
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Icon name="exit-to-app" color="black" size={24} />
            <Text style={styles.text2}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Icon name="exit-to-app" color="black" size={24} />
            <Text style={styles.text2}>Logout</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FAFAD2"
  },
  box1: {
    //borderWidth: 1,
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  },
  box2: {
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    height: 220
  },
  box3: {
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    paddingTop: 3,
    paddingBottom: 3
  },
  box4: {
    //borderWidth: 1,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 20,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  buttonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F08080",
    marginBottom: 20,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    flexDirection: "row",
    paddingLeft: 10,
  },
  text: {
    fontSize: 20,
    color:"black",
  },
  text2: {
    fontSize: 18,
    color: "black"
  },
  image: {
    width: 150,
    height: 150,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  profile: {
    //borderWidth: 1,
    marginTop: 10,
    marginLeft: 120,
    marginRight: 100,
    color: "black",
    fontSize: 20,
    
  }
});
export default Profile;
