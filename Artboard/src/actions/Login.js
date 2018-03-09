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

import AColor from "../config/AColor";

export default class Login extends Component {

    constructor(props) {
         super(props);
         this.state = {
           tel: '',
           pass: ''
         };
    }

    loginBtnClick() {
        if (this.state.tel === '' || this.state.pass === '') {
            Alert.alert('','手机号或密码不能为空', [{text:'好'}])
            return;
        }

        if (!RegExp('^1[3,5,8][0-9]{9}$').test(this.state.tel)) {
            Alert.alert('','手机号格式不正确', [{text:'好'}])
            return;
        }

        if (this.state.pass.length < 6) {
            Alert.alert('','密码不能少于6位', [{text:'好'}])
            return;
        }
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

    render() {
        return (
            <ScrollView style = {styles.container} keyboardDismissMode="on-drag" keyboardShouldPersistTaps={false} scrollEnabled={false}>
                <View style = {styles.titleView}>
                    <Text style = {styles.title}>登录</Text>
                </View>

                <Image style={styles.hello} source={require('../images/login_hello.png')} resizeMode='contain'/>

                <View style = {styles.tel}>
                    <TextInput style={styles.inputView} placeholder='请输入手机号' keyboardType = "number-pad"   selectionColor = {AColor.color_red} onChangeText={(text) => {this.setState({tel: text});}}/>
                </View>
                <View style = {styles.pass}>
                    <TextInput style={styles.inputView} placeholder='请输入密码' secureTextEntry={true} selectionColor = {AColor.color_red} onChangeText={(text) => {this.setState({pass: text});}}/>
                </View>

                <TouchableHighlight style = {[styles.login, {backgroundColor: this.isValidTelAndPass() == true ? AColor.color_blue : 'none'}]} underlayColor='none' onPress={()=>this.loginBtnClick()}>
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
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
        alignItems: 'center',
        justifyContent: 'center',

    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
,
});


