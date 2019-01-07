import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import CommonStyles from '../../res/styles/CommonStyles'
import NavigationService from '../util/NavigateUtils';


/**
 * github元素
 */
export default class PopularItem extends Component {

    goToDetail() {
        NavigationService.navigate('Web', { 
            content_url: this.props.item.html_url,
            title: this.props.item.full_name
        });
    }

    render() {
        item = this.props.item;
        return (
            <TouchableHighlight style={CommonStyles.list_item}
                underlayColor='#eeeeee'
                onPress={this.goToDetail.bind(this)}>

                <View>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.author}>Author: </Text>
                            <Image
                                style={{ width: 20, height: 16, }}
                                source={{ uri: item.owner.avatar_url }} />
                        </View>

                        <Text style={styles.author}>{`stars: ${item.stargazers_count}`}</Text>
                    </View>
                </View>

            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        flex: 1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#666666'
    },
    author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#999999'
    },
})