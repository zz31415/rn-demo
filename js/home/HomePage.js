import React, { Component } from 'react';
import { View } from 'react-native'
import MainTab from './tab/MainTab';
import SettingsTab from './tab/SettingsTab';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, NavigationEvents } from 'react-navigation';
import WebViewPage from '../popular/WebViewPage';
import NavigationService from '../util/NavigateUtils';


const TabNavigator = createBottomTabNavigator(
    {
        Main: MainTab,
        Settings: SettingsTab,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Main') {
                    iconName = `home`;
                } else if (routeName === 'Settings') {
                    iconName = `settings`;
                }
                return <MaterialIcons name={iconName} size={30} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
        },
        //hide header in tabNavigatgor
        navigationOptions: () => ({
            header: null
        }),
    });

const MainStack = createStackNavigator({
    Main: TabNavigator,
    Web: WebViewPage,
});

/**
 * 必须使用createAppContainer方法才可以使用
 */
const Tabs = createAppContainer(MainStack);

export default class HomePage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Tabs ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />
            </View>

        )
    }

}
