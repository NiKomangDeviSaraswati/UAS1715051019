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
import { Icon, Card, Divider, ListItem } from "react-native-elements";
const axios = require("axios");
import Header from "./Header";
class ListObat extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://deviundiksha.000webhostapp.com/apotik/getObat.php")
      .then(response => {
        console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header judul={"LIST OBAT"} />
        <View style={styles.box4}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("TambahObat")}
          >
            <Icon name="add" color="black" size={24} />
            <Text style={styles.text2}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Icon name="home" color="black" size={24} />
            <Text style={styles.text2}>Home</Text>
          </TouchableOpacity>
        </View>

        <View>
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
              style={styles.list}
                onPress={() =>
                  this.props.navigation.navigate("DetailObat", {
                    kode_obat: item.kode_obat
                  })
                }
                title={item.nama_obat}
                leftAvatar={{
                  source: {
                    uri:
                      "https://deviundiksha.000webhostapp.com/apotik/img/" +item.foto_obat
                  }
                }}
              />
              )}
              />
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
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 30,
    alignItems: 'flex-end',
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom: 15,

  },
  buttonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F08080",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight:10,
  },
  text: {
    fontSize: 20
  },
  text2: {
    fontSize: 18,
    color: "black"
  },
  list:{
    backgroundColor: "#FAFAD2",
  }
});
export default ListObat;
