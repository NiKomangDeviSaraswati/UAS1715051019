import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Modal,
  Alert
} from "react-native";
import { Icon, Card, Divider } from "react-native-elements";
import QRCodeScanner from "react-native-qrcode-scanner";
const axios = require("axios");
import Header from "./Header";

class TambahObat extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      kode_obat: "",
      nama_obat: "",
      jenis_obat: "",
      tanggal_expired: "",
      stok_obat: "",
      suplier_obat: "",
      foto_obat: "",
      srcImg: "",
      uri: "",
      fileName: "",
      status: "Ready",
      ModalVisibleStatus: false
    };
  }
  ShowModalFunction(visible) {
    this.setState({ ModalVisibleStatus: visible });
  }
  onSuccess(e) {
    this.setState({
      kode_obat: e.data
    });
    this.ShowModalFunction(!this.state.ModalVisibleStatus);
  }
  upload() {
    this.uploadPicture();
    axios
      .post(
        "https://deviundiksha.000webhostapp.com/apotik/tambahObat.php",
        {
          kode_obat: this.state.kode_obat,
          nama_obat: this.state.nama_obat,
          jenis_obat: this.state.jenis_obat,
          tanggal_expired: this.state.tanggal_expired,
          stok_obat: this.state.stok_obat,
          suplier_obat: this.state.suplier_obat,
          foto_obat: this.state.foto_obat
        }
      )
      .then(response => {
        console.log("Status  " + response);
        console.log(response);
        Alert.alert(response.data.pesan);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  choosePicture = () => {
    console.log("upload");
    var ImagePicker = require("react-native-image-picker");
    var options = {
      title: "Pilih Gambar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        console.log(source);
        console.log(response.fileName);
        this.setState({
          srcImg: source,
          uri: response.uri,
          fileName: response.fileName,
          foto_obat: response.fileName
        });
      }
    });
  };
  uploadPicture = () => {
    const data = new FormData();
    data.append("fileToUpload", {
      uri: this.state.uri,
      type: "image/jpeg", // or photo.type
      name: this.state.fileName
    });
    const url =
      "https://deviundiksha.000webhostapp.com/apotik/uploadFotoObat.php";
    fetch(url, {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          loading: false
        });
      });
  };

  submit() {
    this.upload();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header judul={"TAMBAH OBAT"} />
        <View style={styles.box1}>
          <TouchableOpacity onPress={this.choosePicture.bind(this)}>
            <View style={styles.image}>
              {this.state.srcImg === null ? null : (
                <Image source={this.state.srcImg} style={styles.image} />
              )}
            </View>
          </TouchableOpacity>
          <Modal
                transparent={true}
                animationType={"fade"}
                visible={this.state.ModalVisibleStatus}
                onRequestClose={() => {
                  this.ShowModalFunction(!this.state.ModalVisibleStatus);
                }}
              >
                <View
                  style={{
                    flex: 0,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.ModalInsideView}>
                    <QRCodeScanner
                      onRead={this.onSuccess.bind(this)}
                      reactivate={true}
                    />
                  </View>
                </View>
              </Modal>
        </View>
        <ScrollView>
          <View style={styles.box2}>
            <View style={styles.box5}>
              <TextInput
                placeholder="Barcode"
                onChangeText={kode_obat => this.setState({ kode_obat })}
                value={this.state.kode_obat}
                style={styles.textInput2}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.qr}
                onPress={() => {
                  this.ShowModalFunction(true);
                }}
              >
                <Icon name="camera-alt" color="black" size={20} />
                <Text style={styles.text2}>Scan</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Nama Obat"
              onChangeText={nama_obat => this.setState({ nama_obat })}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Jenis Obat"
              onChangeText={jenis_obat => this.setState({ jenis_obat })}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Tanggal Expired (Tahun-Bulan-Tanggal)"
              onChangeText={tanggal_expired =>
                this.setState({ tanggal_expired })
              }
              style={styles.textInput}
            />
            <TextInput
              placeholder="Stok Obat"
              onChangeText={stok_obat => this.setState({ stok_obat })}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Suplier Obat"
              onChangeText={suplier_obat => this.setState({ suplier_obat })}
              style={styles.textInput}
            />
          </View>
        </ScrollView>
        <View style={styles.box6}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Home")}>
            <Text style={styles.text2}>Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => this.submit()}>
            <Text style={styles.text2}>Tambah</Text>
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
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  },
  box2: {
    //borderWidth: 1,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    height: 300
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
    backgroundColor:  "#F08080",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100
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
  profile: {
    //borderWidth: 1,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    color:  "#F08080",
    fontSize: 20
  },
  textInput: {
    borderWidth: 1,
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
  textInput2: {
    borderWidth: 1,
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: 210,
    marginRight: 10
  },
  box5: {
    //borderWidth: 1,
    flexDirection: "row"
  },
  qr: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F08080",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    width: 80,
    flexDirection: "row",
    paddingLeft: 10
  },
  box6: {
    //borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    flexDirection:"row",
    justifyContent:"space-between"
  }
});
export default TambahObat;
