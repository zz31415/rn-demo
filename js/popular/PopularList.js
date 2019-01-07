import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import PopularItem from './PopularItem'

/**
 * 流行列表
 */
export default class PopularList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            dataSource: []
        };

        this._onRefresh = this._onRefresh.bind(this);
    }

    _renderItem(item) {
        return (
            <PopularItem item={item}>
            </PopularItem>
        )
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    fetchData() {
        let url = `https://api.github.com/search/repositories?q=${this.props.keyword}&sort=stars`;
        return fetch(url).then((response) => response.json())
            .then((responseData) => {
                if (!responseData || !responseData.items) {
                    return;
                }
                return responseData.items;
            })
            .then((items) => {
                this.setState({ dataSource: items })
            })
    }

    componentDidMount() {
        this._onRefresh();
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => this._renderItem(item)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    keyExtractor={(item, index) => 'key' + index}
                />
            </View>
        )
    }
}

