import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CommonStyle } from '../../../res/styles/CommonStyles';
import { FlatList } from 'react-native-gesture-handler';
import KeyDao from '../../model/KeyDao';
import emitter from "../../util/Eventor"
import SessionManager from '../../model/SessionManager';

export default class SettingsTab extends Component {

    constructor(props) {
        super(props)
        this.keyDao = new KeyDao();
        this.keyDao.setMyKeys(SessionManager.getInstance().getKeys());
        this.state = {
            myKeys: SessionManager.getInstance().getKeys(),
            recommondKeys: this.keyDao.getRecommondKeys(),
            mode: 'done',
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>

                <View style={{
                    backgroundColor: CommonStyle.themeColor,
                    height: CommonStyle.navContentHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ fontSize: 24, color: 'white', }}>Settings</Text>
                </View>

                <ScrollView>

                    <View style={styles.titleContainer}>
                        <Text style={{ fontSize: 16 }}>My Keys</Text>
                        <Text style={{ flex: 1, fontSize: 12, alignSelf: 'flex-end', marginLeft: 5, color: CommonStyle.textGrayColor }}>
                            {(this.state.mode == 'edit') ? 'Click to remove' : 'Click to the corresponding section'}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            color: CommonStyle.red,
                            borderColor: CommonStyle.textGrayColor,
                            borderWidth: 0.5,
                            borderRadius: 10,
                            paddingLeft: 7,
                            paddingRight: 7,
                        }}
                            onPress={() => { this._changeMode() }}>{(this.state.mode == 'edit') ? 'Done' : 'Edit'}</Text>
                    </View>

                    <View
                        style={{ padding: 5, flexDirection: 'row', flexWrap: "wrap" }}>
                        {this._renderMyKey()}
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={{ fontSize: 16 }}>Recommond Keys</Text>
                        <Text style={{ flex: 1, fontSize: 12, alignSelf: 'flex-end', marginLeft: 5, color: CommonStyle.textGrayColor }}>
                            Click to add
                    </Text>
                    </View>

                    <View
                        style={{ padding: 5, flexDirection: 'row', flexWrap: "wrap" }}>
                        {this._renderRecommondKey()}
                    </View>
                </ScrollView>

            </View >
        )
    }

    _changeMode() {
        this.setState(previousState => {
            var newMode = (previousState.mode == 'edit') ? 'done' : 'edit';
            return {
                mode: newMode,
            }
        })
    }

    _renderMyKey() {
        var views = [];
        var _this = this;
        this.state.myKeys.forEach(function (element, index, array) {
            views.push(
                <TouchableOpacity style={styles.keyContainer} key={index + ''}
                    onPress={() => { _this._clickMyKey(element) }}>
                    <Text style={{ fontSize: 14, color: (_this.keyDao.keyAll == element) ? CommonStyle.textGrayColor : CommonStyle.textBlockColor, }}>{element}</Text>
                </TouchableOpacity>);
        });
        return views;
    }

    _renderRecommondKey() {
        var views = [];
        var _this = this;
        this.state.recommondKeys.forEach(function (element, index, array) {
            views.push(
                <TouchableOpacity
                    style={[styles.keyContainer, { backgroundColor: 'white' }]}
                    key={index + ''}
                    onPress={() => { _this._addKey(element) }}>
                    <Text style={{ fontSize: 14, color: CommonStyle.textBlockColor, }}>{'+ ' + element}</Text>
                </TouchableOpacity>);
        });
        return views;
    }

    _addKey(element) {
        this.setState(previousState => {
            previousState.myKeys.push(element);
            this.keyDao.saveKeysToStorage(previousState.myKeys);
            emitter.emit("keysChanged", previousState.myKeys)
            return {
                myKeys: previousState.myKeys,
                recommondKeys: this.keyDao.getRecommondKeys()
            };
        });
    }

    _clickMyKey(element) {
        if ('edit' == this.state.mode) {
            //编辑模式下删除
            if (this.keyDao.keyAll == element) {
                return;
            }
            this.setState(previousState => {
                previousState.myKeys.splice(previousState.myKeys.indexOf(element), 1);
                this.keyDao.saveKeysToStorage(previousState.myKeys);
                emitter.emit("keysChanged", previousState.myKeys)
                return {
                    myKeys: previousState.myKeys,
                    recommondKeys: this.keyDao.getRecommondKeys()
                };
            });
        } else {
            //点击打开对应tab
            this.props.navigation.navigate('Main');
            emitter.emit("keysChanged", element);
        }
    }


}

const keyWidth = (CommonStyle.screenWidth - 5 * 2 - 6 * 4) / 4

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8,
        marginBottom: 12,
    },
    keyContainer: {
        borderColor: CommonStyle.textGrayColor,
        borderWidth: 0.5,
        borderRadius: 3,
        paddingTop: 7,
        paddingBottom: 7,
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3,
        width: keyWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f2f4'
    }
})