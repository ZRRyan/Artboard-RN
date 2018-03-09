import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    PixelRatio,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import 'whatwg-fetch';
import AColor from "../config/AColor";
import NetRequest from "../config/NetRequest";
import Global from "../config/Global"
import { AsyncStorage } from 'react-native';
import Storage from "../storage/Storage"

export default class Login extends Component {

    constructor(props) {
         super(props);
         this.state = {
             tel: '',
             pass: '',
         };

    }

    componentWillMount() {

        Storage.get(Global.user_key, (result) => {

            if (result == null) {
                return
            }

            this.setState({
                tel: result.telephone ? result.telephone : '',
                pass: result.password ? result.pass : ''
            });
        })
    }

    isValidTelAndPass () {
        if (this.state.tel === '' || this.state.pass === '') {
            return false
        }

        if (!RegExp('^1[3,5,8][0-9]{9}$').test(this.state.tel)) {
            return false
        }

        if (this.state.pass.length < 6) {
            return false
        }

        return true
    }

    static showAlert(msg) {
        Alert.alert('', msg, [{text:'好'}])
    }

    loginBtnClick() {

        if (this.state.tel === '' || this.state.pass === '') {
            Login.showAlert('手机号或密码不能为空')
            return;
        }

        if (!RegExp('^1[3,5,8][0-9]{9}$').test(this.state.tel)) {
            Login.showAlert('手机号格式不正确')
            return;
        }

        if (this.state.pass.length < 6) {
            Login.showAlert('密码不能少于6位')
            return;
        }

        this.requestLogin()


    }


    requestLogin() {
        let url = `${NetRequest.SERVER_DOMAIN}sys/login`;
        let params = {telephone:this.state.tel, password: this.state.pass};

        NetRequest.post(url, params, (responseJson) => {
            if (responseJson.code == 200) {
                Storage.save(Global.user_key, responseJson.data)
                Login.showAlert('登录成功')
            } else  {
                Login.showAlert(responseJson.msg)
            }
        }, (error) => {
            Login.showAlert('登录失败:' + error)
        })
    }





    render() {
        return (
            <ScrollView style = {styles.container} keyboardDismissMode="on-drag" keyboardShouldPersistTaps={false} scrollEnabled={false}>
                <View style = {styles.titleView}>
                    <Text style = {styles.title}>登录</Text>
                </View>

                <Image style={styles.hello} source={require('../images/login_hello.png')} resizeMode='contain'/>

                <View style = {styles.tel}>
                    <TextInput value={this.state.tel} style={styles.inputView} placeholder='请输入手机号' keyboardType = "number-pad"   selectionColor = {AColor.color_red} onChangeText={(text) => {this.setState({tel: text});}}/>
                </View>
                <View style = {styles.pass}>
                    <TextInput value={this.state.pass} style={styles.inputView} placeholder='请输入密码' secureTextEntry={true} selectionColor = {AColor.color_red} onChangeText={(text) => {this.setState({pass: text});}}/>
                </View>

                <TouchableHighlight style = {[styles.login, {backgroundColor: this.isValidTelAndPass() == true ? AColor.color_blue : AColor.white}]} underlayColor='none' onPress={()=>this.loginBtnClick()}>
                    <Text style = {[styles.loginText, {color: this.isValidTelAndPass() == true ? AColor.color_white : AColor.color_lightBlue}]}>登录</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleView: {
        justifyContent: 'center',
        alignItems:'center',
        marginTop:20,
        height:44,
    },

    title: {
        fontSize: 17,
        color: AColor.color_black,
        fontWeight: 'bold'
    },
    hello: {
        marginTop: 80,
        height:35,
    },
    tel: {
        marginTop: 80,
        marginLeft: 35,
        marginRight: 35,
        height: 44,
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor: AColor.color_lightGray
    },
    pass: {
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        height: 44,
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor: AColor.color_lightGray
    },
    inputView: {
        textAlign:'center',
        fontSize: 15,
    },
    inputLine: {
        backgroundColor:'gray',
        margin:0,
        marginBottom:-1,
        height: 2
    },
    login: {
        flex: 1,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        height: 44,
        borderRadius: 22,
        borderColor: AColor.color_lightBlue,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
,
});


