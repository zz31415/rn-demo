/**
 * 会话数据管理
 */

let instance = null;

export default class SessionManager {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    static getInstance() {
        let singleton = new SessionManager();
        return singleton;
    }

    setKeys(keys) {
        this.keys = keys;
    }

    getKeys() {
        return this.keys;
    }
}