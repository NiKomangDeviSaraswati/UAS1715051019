import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Alert
} from "react-native";
import { Icon, Card, Divider } from "react-native-elements";
const axios = require("axios");
import Header from "./Header";
class DetailObat extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      kode_obat: this.props.navigation.state.params.kode_obat
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://deviundiksha.000webhostapp.com/apotik/getDetailObat.php?kode_obat=" +
          this.state.kode_obat
      )
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
        <Header judul={"DETAIL OBAT"} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.box1}>
              <View style={styles.image}>
                <Image
                  source={{
                    uri:
                      "https://deviundiksha.000webhostapp.com/apotik/img/" +
                      item.foto_obat
                  }}
                  style={styles.image}
                />
              </View>
            </View>
          )}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.box2}>
              <Text style={styles.profile}>DETAIL OBAT</Text>
              <View style={styles.box3} />
              <View style={styles.box3}>
                <Text>Barcode </Text>
                <Text> {item.kode_obat}</Text>
              </View>
              <View style={styles.box3}>
                <Text>Nama Obat </Text>
                <Text> {item.nama_obat}</Text>
              </View>
              <View style={styles.box3}>
                <Text>Jenis Obat </Text>
                <Text> {item.jenis_obat}</Text>
              </View>
              <View style={styles.box3}>
                <Text>Tanggal Expired </Text>
                <Text> {item.tanggal_expired}</Text>
              </View>
              <View style={styles.box3}>
                <Text>Stok Obat </Text>
                <Text> {item.stok_obat}</Text>
              </View>
              <View style={styles.box3}>
                <Text>Suplier Obat </Text>
                <Text> {item.suplier_obat}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.box4}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() =>
              this.props.navigation.navigate("UpdateObat", {
                kode_obat: this.state.data[0].kode_obat,
                nama_obat: this.state.data[0].nama_obat,
                jenis_obat: this.state.data[0].jenis_obat,
                tanggal_expired: this.state.data[0].tanggal_expired,
                stok_obat: this.state.data[0].stok_obat,
                suplier_obat: this.state.data[0].suplier_obat,
                foto_obat: this.state.data[0].foto_obat
              })
            }
          >
            <Icon name="edit" color="black" size={24} />
            <Text style={styles.text2}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.deleteStyle}
            onPress={() => {
              Alert.alert(
                "Warning!",
                "Yakin ingin menghapus obat " + this.state.data[0].nama_obat + " ?",
                [
                  {
                    text: "Batal",
                    onPress: () => console.log("Cancel ditekan"),
                    style: "cancel"
                  },
                  {
                    text: "OK",
                    onPress: () =>
                      {
                        axios
                          .post(
                            "https://deviundiksha.000webhostapp.com/apotik/hapusObat.php",
                            {
                              kode_obat: this.state
                                .kode_obat
                            }
                          )
                          .then(response => {
                            console.log(
                              "Status  " + response
                            );
                            console.log(response);
                            this.props.navigation.navigate('ListObat');
                          })
                          .catch(function(error) {
                            console.log(error);
                          });
                      }
                  }
                ],
                { cancelable: true }
              );
            }}
          >
            <Icon name="delete" color="#fff" size={24} />
            <Text style={styles.text2}>Delete</Text>
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
    backgroundColor:"#FAFAD2",
  },
  box1: {
    //borderWidth: 1,
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  },
  box2: {
    borderWidth: 1,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    height: 250
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
    marginLeft: 70,
    marginRight: 70,
    paddingBottom: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
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
    paddingLeft: 10
  },
  deleteStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "red",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    flexDirection: "row",
    paddingLeft: 10
  },
  text: {
    fontSize: 20
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
});
export default DetailObat;
