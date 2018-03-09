import { AsyncStorage } from 'react-native';
import {Component} from "react";

export default class Storage extends Component {

    static get (key, succ) {
        AsyncStorage.getItem(key, function (error, result) {
            if (!error) {
                succ(JSON.parse(result))
            }

        })
    }


     static save (key, value) {
        AsyncStorage.setItem(key, JSON.stringify(value), function (error) {
            if (!error) {
                // succ()
            }
        })
    }
}



