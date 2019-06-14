import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Profile from "./Profile";
import ListObat from "./ListObat";
import TambahObat from "./TambahObat";


const AppContainer = createStackNavigator(
  {
    Login: Login,
    Header: Header,
    Home: Home,
    Profile: Profile,
    ListObat: ListObat,
    TambahObat: TambahObat,

  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppContainer);
