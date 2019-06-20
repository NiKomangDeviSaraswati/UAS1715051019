"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, Alert, View, Button } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

export default class QR extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      kode_obat_qr: "",
      status: "Ready"
    };
  }

  onSuccess(e) {
    console.log(e);
    this.setState({
      kode_obat_qr: e.data,
      status: "Coba Lagi"
    });
    this.props.navigation.navigate("TambahObat", {
      kode_obat_qr: this.state.kode_obat_qr
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          reactivate={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});
