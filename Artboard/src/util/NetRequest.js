import {Component} from "react";
import RNFS from 'react-native-fs';

export default class NetRequest extends Component {

    // static SERVER_DOMAIN = 'http://47.92.28.213:8088/ArtBoard';
    static SERVER_DOMAIN = 'http://139.199.113.220:8080/ArtBoard'

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


    static download(url, filePath, progress, succ, fail) {

        const options = {
            fromUrl: url,
            toFile: filePath,
            background: true,
            begin: (res) => {

            },
            progress: (res) => {
                let pro = res.bytesWritten / res.contentLength
                progress(pro)
            }
        }

        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                succ(filePath)
            }).catch(err => {
                fail(err)
            })
        }
        catch (err) {
            fail(err)
        }

    }

}