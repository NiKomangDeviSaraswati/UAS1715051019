import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TextInput,
    Alert
} from "react-native";
import Header from "./Header";
const apotik = require("./img/apotik.png");

class Login extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={styles.container}>
                <Header judul={"LOGIN"} />
                <View style={styles.imageContainer}>
                    <Image source={apotik} style={styles.image} />
                </View>
                <View style={styles.box1}>

                    <TextInput
                        placeholder="Username"
                        onChangeText={username => this.setState({ username })}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Kata Sandi"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.box2}>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate("Home")}
                    >
                        <Text style={styles.text}>Masuk</Text>
                    </TouchableHighlight>
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
        //borderWidth:1,
        marginTop: 80,
        marginBottom: 20,
        justifyContent: "center",
        height: 150,
        marginLeft: 20,
        marginRight: 20
    },
    box2: {
        //borderWidth:1,
        justifyContent: "center",
        height: 60,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
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
        height: 45,
        borderRadius: 5,
        alignItems: "center"
    },
    text: {
        color: "black",
        fontSize: 20
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 7
    },
    imageContainer: {
        //borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginTop:50,
    },
});
export default Login;
