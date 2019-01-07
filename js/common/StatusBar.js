import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import { CommonStyle } from '../../res/styles/CommonStyles'

export default class MyStatusBar extends Component {

    static setBackgroundColor(backgroundColor) {
        StatusBar.setBackgroundColor(backgroundColor)
    }

    static setStyle(style) {
        StatusBar.setBarStyle(style)
    }


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StatusBar
                backgroundColor={CommonStyle.themeColor} />
        )
    }
}