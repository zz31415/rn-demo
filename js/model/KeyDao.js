/**
 * 关键词管理
 */
import { AsyncStorage, } from 'react-native';

const FAVORITE_KEY = 'favorite_key'

export default class KeyDao {

    constructor() {
        this.allKeys = ['Java', 'C', 'Python', 'C++', 'VB', 'C#', 'PHP',
            'JS', 'SQL', 'OC', 'Delphi', 'Ruby', 'Matlab', 'Swift', 'Go', 'Perl',
            'R', 'PL/SQL', 'React', 'Ember', 'AngularJ', 'Aurelia', 'Meteor', 'Polymer', 'Vue', 'JQuery']
        this.keyAll = 'all'
        this.myKeys = []
    }

    getMyKeys() {
        var _this = this;
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(FAVORITE_KEY).then((keys) => {
                try {
                    _this.myKeys = keys == null ? [] : JSON.parse(keys);
                    _this.myKeys.splice(0, 0, this.keyAll);
                    resolve(_this.myKeys);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    getRecommondKeys() {
        var _this = this;
        return _this.allKeys.filter(function (element, index, array) {
            return _this.myKeys.indexOf(element) == -1;
        });
    }

    saveKeysToStorage(keys) {
        //不保存all
        AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(keys.slice(1)));
    }

    setMyKeys(keys) {
        this.myKeys = keys;
    }
}

