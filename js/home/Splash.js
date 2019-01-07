/**
 * splash
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from './HomePage';
import SplashScreen from 'react-native-splash-screen'
import SessionManger from '../model/SessionManager';
import KeyDao from '../model/KeyDao';

class SplashPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        _this = this;
        setTimeout(() => {
            _this.props.navigation.replace('Home');
            SplashScreen.hide();
        }, 1000);
        let keyDao = new KeyDao();
        keyDao.getMyKeys().then((keys) => {
            SessionManger.getInstance().setKeys(keys);
        }).catch((error) => {
            console.log("get key error!");
        });;
    }

    render() {
        return (
            <View>
            </View>
        );
    }
}

const SplashNav = createStackNavigator(
    {
        Splash: SplashPage,
        Home: HomePage
    },
    {
        initialRouteName: "Splash"
    })

const App = createAppContainer(SplashNav);

export default App

