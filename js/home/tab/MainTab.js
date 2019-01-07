import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PopularList from '../../popular/PopularList';
import StatusBar from '../../common/StatusBar'
import { CommonStyle } from '../../../res/styles/CommonStyles'
import { createMaterialTopTabNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import emitter from "../../util/Eventor"
import SessionManager from '../../model/SessionManager';

export default class MainTab extends Component {

    constructor(props) {
        super(props)
        props.navigation.addListener('didFocus', payload => {
            StatusBar.setBackgroundColor(CommonStyle.themeColor);
            StatusBar.setStyle('light-content');
        });
        this.state = {
            tabs: SessionManager.getInstance().getKeys(),
        }
    }

    componentDidMount() {
        this.eventEmitter = emitter.addListener("keysChanged", (keys) => {
            if (typeof keys === 'string') {
                //string类型打开tab
                let navigateAction = NavigationActions.navigate({
                    routeName: keys,
                    params: {},
                });
                this.navigationRef.dispatch(navigateAction);
            } else {
                //数组类型更新tab
                this.setState({
                    tabs: keys,
                })
            }
        });
    }
    // 组件销毁前移除事件监听
    componentWillUnmount() {
        emitter.removeListener(this.eventEmitter);
    }

    render() {
        const screens = {}
        this.state.tabs.forEach((key) => {
            screens[key] = {
                screen: () => (
                    <PopularList keyword={key} />
                )
            }
        })

        const TabNavigation = createMaterialTopTabNavigator(screens, {
            initialRouteName: 'all',
            headerMode: 'none',
            tabBarOptions: {
                scrollEnabled: true,
                labelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
                tabStyle: {
                    width: CommonStyle.screenWidth / 4,
                },
                style: {
                    backgroundColor: CommonStyle.themeColor,
                },
                indicatorStyle: {
                    backgroundColor: 'white',
                },
            }
        })
        const TabContainer = createAppContainer(TabNavigation);
        return (
            <TabContainer ref={navigatorRef => {
                this.navigationRef = navigatorRef;
            }} />
        )
    }
}
