import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import AColor from '../config/AColor'

export default class BroadcastItem extends Component {



    render() {
        return (


            <View style={styles.container}>
                <View style={styles.left}>
                    <Image style={styles.header} resizeMode='contain' source={this.props.broadcast.sender.avatarPicture.thumbImage ? {uri: this.props.broadcast.sender.avatarPicture.thumbImage} : require('../images/header_place.png')}/>
                </View>
                <View style={styles.right}>
                    <View style={styles.nickname_time}>
                        <Text style={styles.nickname} color={AColor.color_black}>
                            {this.props.broadcast.sender.nickname ? this.props.broadcast.sender.nickname : 'MEW'}
                        </Text>
                        <Text style={styles.time} color={AColor.color_black}>
                            {this.props.broadcast.createtime}
                        </Text>
                    </View>

                    <Text style={styles.content} color={AColor.color_black}>
                        {this.props.broadcast.content}
                    </Text>

                    <Image style={styles.image} resizeMode='contain' source={this.props.broadcast.pictures[0].thumbImage}/>

                    <View style={styles.address}>
                        <Image style={styles.addressImage} resizeMode='contain' source={require('../images/broadcast_address.png')}/>
                        <Text style={styles.addressTitle} color={AColor.color_black}>
                            {this.props.broadcast.address ? this.props.broadcast.address : '火星'}
                        </Text>
                    </View>

                    <View style={styles.likeComment}>

                    </View>

                </View>



            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row'
    },
    left: {
        marginLeft: 15,
        marginTop: 12,
        width: 45,
    },
    right: {
        flex: 1,
        marginLeft: 12,
        marginRight: 15,
        marginTop: 12,
        backgroundColor:'blue'
    },
    header: {
        width: 45,
        height:45,
        borderRadius: 22.5,
    },
    nickname_time: {
        backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nickname: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 10,
    },
    content: {
        fontSize: 15,
        marginTop: 9,
    },
    image: {

    },
    address: {
        marginTop:9,
        flexDirection: 'row',
    },
    addressImage: {
        width: 15,
        height: 15
    },
    addressTitle: {

    },
    likeComment: {
        marginTop:6,
    }


});

