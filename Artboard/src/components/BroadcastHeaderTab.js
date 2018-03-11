import React, { Component } from 'react';
import {StyleSheet, View, Button} from 'react-native';
import AColor from '../config/AColor'

export default class HeaderTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budge: 0
        };
    }

    recommendBtnClick() {
        this.setState({
            budge: 0
        });

        if (this.props.callback) {
            this.props.callback(0)
        }
    }

    followBtnClick() {
        this.setState({
            budge: 1
        });

        if (this.props.callback) {
            this.props.callback(1)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.tabBtn, {borderBottomWidth: this.state.budge == 0 ? 4 : 0}]}>
                    <Button title='推荐' color={this.state.budge == 0 ? AColor.color_blue : AColor.color_lightBlue} onPress={()=> this.recommendBtnClick()}/>
                </View>
                <View  style={[styles.tabBtn, {borderBottomWidth: this.state.budge == 1 ? 4 : 0}]}>
                    <Button title='关注' color={this.state.budge == 1 ? AColor.color_blue : AColor.color_lightBlue} onPress={() => this.followBtnClick()}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        height: 44,
        marginTop: 20,
        justifyContent:'center',
        alignItems:'center',
        // flex:1,
        flexDirection:'row',
        borderBottomWidth: 1,
        borderColor: AColor.color_lightGray
    },
    tabBtn: {
        marginLeft: 10,
        marginRight:10,
        borderColor: AColor.color_blue,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
    },
    recommend: {

    },
    follow: {

    }
})