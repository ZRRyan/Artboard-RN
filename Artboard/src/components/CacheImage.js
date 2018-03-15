import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image
} from 'react-native';
import NetRequest from '../util/NetRequest';
import RNFS from "react-native-fs";


export default class CacheImage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            placeholder: '',
            thumbil: '',
            bigImage: '',
            thumbilPath: '',
            bigImagePath: '',
            loadstate: 0, // 加载状态： 0:未加载， 1: 已加载缩略图， 2: 已加载大图
            resource: {uri:''},
        };
    }

    componentWillMount() {

        if (this.props.display == false) {
            return
        }

        this.setState({
            placeholder: this.props.placeholder ? NetRequest.SERVER_DOMAIN + '/upload/' + this.props.placeholder : '',
            thumbil: this.props.thumbil ? NetRequest.SERVER_DOMAIN + '/compressUpload/' + this.props.thumbil : '',
            bigImage: this.props.bigImage ? this.props.bigImage : '',
            thumbilPath: this.props.thumbilPath ? this.props.thumbilPath : '',
            bigImagePath: this.props.bigImagePath ? this.props.bigImagePath : '',
            resource: this.props.placeholder
        })


        return
        if (this.state.bigImage == '' || this.state.bigImagePath == '') {
            this.getThumbil()
        } else {
            this.getImage()
        }

    }

    getImage() {
        RNFS.exists(this.state.bigImagePath)
            .then((res) => {
                if (res == true) { // 大图存在
                    this.setState({
                        loadstate: 2,
                        resource: {uri:this.state.bigImagePath}
                    })
                    return
                } else { // 大图不存在

                    this.getThumbil()
                    this.getBigImage()
                }
            })
    }

    getThumbil() {
        // 预加载小图
        RNFS.exists(this.state.bigImagePath)
            .then((res) => {
                if (this.state.loadstate == 2) { // 大图存在时不进行加载
                    return
                }
                if (res == true) { // 小图存在
                    this.setState({
                        loadstate: 1,
                        resource: {uri:this.state.thumbilPath}
                    })
                    return
                } else if (res == false) { // 小图不存在，进行下载小图
                    // 下载小图
                    NetRequest.download(this.state.bigImage, this.state.bigImagePath, (pro) => {

                    }, (filePath) => {
                        if (this.state.loadstate == 2) { // 大图存在时不进行加载
                            return
                        }
                        this.setState({
                            loadstate: 1,
                            resource: {uri:this.state.thumbilPath}
                        })
                        return
                    }, (err) => {
                    })
                }
            })
    }

    getBigImage() {
        // 下载大图
        NetRequest.download(this.state.bigImage, this.state.bigImagePath, (pro) => {

        }, (filePath) => {
            this.setState({
                loadstate: 2,
                resource: {uri:this.state.bigImagePath}
            })
            return
        }, (err) => {
        })
    }

    render() {
        return(
            <Image resizeMode={this.props.resizeMode} style={[this.props.style, display=this.props.display]}  source = {this.state.resource} blurRadius={this.state.loadstate == 2 ? 0 : 10}/>
        )
    }
}