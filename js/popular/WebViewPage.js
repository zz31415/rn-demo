import React, { Component } from 'react';
import { View, WebView, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation';

import StatusBar from '../common/StatusBar'

const WEBVIEW_REF = 'webview';

export default class WebViewPage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: `${state.params.title}`,
            headerLeft: <HeaderBackButton onPress={navigation.getParam('backPage')} />
        };
    };

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        const { navigation } = this.props;
        const contentUrl = navigation.getParam('content_url');
        this.title = navigation.getParam('title')
        this.state = {
            url: contentUrl,
            canGoBack: false,
        }
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.props.navigation.setParams({ backPage: this.onBackButtonPressAndroid });
        StatusBar.setBackgroundColor('white')
        StatusBar.setStyle('dark-content')
    }

    onBackButtonPressAndroid = () => {
        if (this.state.canGoBack) {
            this.refs[WEBVIEW_REF].goBack();
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    ref={WEBVIEW_REF}
                    startInLoadingState={true}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    source={{ uri: this.state.url }} />
            </View>
        )
    }

}