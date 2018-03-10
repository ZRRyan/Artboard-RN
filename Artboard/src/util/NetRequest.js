import {Component} from "react";

export default class NetRequest extends Component {

    static SERVER_DOMAIN = 'http://47.92.28.213:8088/ArtBoard/';

    /*get 网络请求*/
    static get(url, params, succ, fail) {
        if (params) {
            let paramArr = [];
            // 拼接参数
            Object.keys(params).forEach(key => paramArr.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramArr.join('&')
            } else {
                url += '&' + paramArr.join('&')
            }
        }

        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                succ(responseJSON)
            })
            .catch((error) => {
                fail(error)
            })
    }


    /*post 网络请求*/
    static post(url, params, succ, fail) {

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                succ(responseJSON)
            })
            .catch((error) => {
                fail(error)
            })
    }

}