import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import AColor from '../config/AColor';
import TimeTool from '../util/TimeTool'
import NetRequest from '../util/NetRequest';
import RNFS from 'react-native-fs';
import CacheImage from '../components/CacheImage';

const imgWidth = Dimensions.get('window').width - 87

export default class BroadcastItem extends Component {


    render() {
        return (


            <View style={styles.container}>
                <View style={styles.left}>

                    <CacheImage resizeMode='contain' style={[styles.header, {display:false}]}
                                thumbil={(this.props.broadcast.sender.avatarPicture && this.props.broadcast.sender.avatarPicture.thumbnail) ? (this.props.broadcast.sender.avatarPicture.thumbnail) : ''}
                                bigImage={(this.props.broadcast.sender.avatarPicture && this.props.broadcast.sender.avatarPicture.bigimg) ? this.props.broadcast.sender.avatarPicture.bigimg : ''}
                                thumbilPath={(this.props.broadcast.sender.avatarPicture && this.props.broadcast.sender.avatarPicture.thumbnail) ? RNFS.DocumentDirectoryPath + 'header_thumbil_' + this.props.broadcast.sender.avatarPicture.thumbnail + '.jpg' : ''}
                                bigImagePath={(this.props.broadcast.sender.avatarPicture && this.props.broadcast.sender.avatarPicture.bigimg) ? RNFS.DocumentDirectoryPath + 'header_' + this.props.broadcast.sender.avatarPicture.bigimg + '.jpg' : ''}
                                placeholder={require('../images/header_place.png')}/>

                </View>
                <View style={styles.right}>
                    <View style={styles.nickname_time}>
                        <Text style={styles.nickname}>
                            {this.props.broadcast.sender.nickname ? this.props.broadcast.sender.nickname : 'MEW'}
                        </Text>
                        <Text style={styles.time}>
                            {TimeTool.formate(this.props.broadcast.createtime)}
                        </Text>
                    </View>
                    <Text style={[styles.content, {display: this.props.broadcast.content ? false : true}]} >
                        {this.props.broadcast.content}
                    </Text>


                    <CacheImage resizeMode='cover' style={[styles.image, {width: imgWidth, height: (this.props.broadcast.type == 1 ? this.props.broadcast.pictures[0].height * imgWidth / this.props.broadcast.pictures[0].width : 0), display: (this.props.broadcast.pictures.count > 0 && this.props.broadcast.type == 1 ? true : false)}]}
                                thumbil={this.props.broadcast.type == 1 ? this.props.broadcast.pictures[0].thumbnail : ''}
                                bigImage={this.props.broadcast.type == 1 ? this.props.broadcast.pictures[0].bigimg : ''}
                                thumbilPath={this.props.broadcast.type == 1 ? RNFS.DocumentDirectoryPath + 'broadcast_thumbil_' + this.props.broadcast.id + '.jpg' : ''}
                                bigImagePath={this.props.broadcast.type == 1 ? RNFS.DocumentDirectoryPath + 'broadcast_' + this.props.broadcast.id + '.jpg' : ''}
                                placeholder={require('../images/header_place.png')}/>


                    <View style={styles.address}>
                        <Image style={styles.addressImage} resizeMode='contain' source={require('../images/broadcast_address.png')}/>
                        <Text style={styles.addressTitle}>
                            {this.props.broadcast.address ? this.props.broadcast.address : '火星'}
                        </Text>
                    </View>



                    <View style={styles.likeComment}>
                        <Text style={styles.readNum}>
                            {this.props.broadcast.readnum}阅读
                        </Text>
                        <View style={styles.likeCommentView}>
                            <LikeCommentView
                                imgSource={this.props.broadcast.isLike ? require('../images/broadcast_like_select.png') : require('../images/broadcast_like.png')}
                                textColor={this.props.broadcast.isLike ? AColor.color_red : AColor.color_gray}
                                text = {this.props.broadcast.likenum}
                            />
                            <LikeCommentView
                                imgSource={this.props.broadcast.isComment ? require('../images/broadcast_comment_select.png') : require('../images/broadcast_comment.png')}
                                textColor={this.props.broadcast.isComment ? AColor.color_red : AColor.color_gray}
                                text = {this.props.broadcast.commentnum}
                            />
                            <LikeCommentView
                                imgSource={require('../images/broadcast_hi_select.png')}
                                textColor={AColor.color_red}
                                text = {'问好'}
                            />
                        </View>

                    </View>

                </View>



            </View>

        );
    }
}


class LikeCommentView extends Component {
    render() {
        return(
            <View style = {styles.likeCommentItem} underlayColor='none'>
                {/*<Text>Hello </Text>*/}
                <Image style={{width: 15, height: 15}} resizeMode='contain' source={this.props.imgSource}/>
                <Text style={{fontSize: 13, marginLeft: 3, color:this.props.textColor}}> {this.props.text} </Text>
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
        // backgroundColor:'blue'
    },
    header: {
        width: 45,
        height:45,
        borderRadius: 22.5,
    },
    nickname_time: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: AColor.color_black
    },
    nickname: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 10,
        color:AColor.color_black
    },
    content: {
        fontSize: 15,
        marginTop: 9,
        color:AColor.color_black
    },
    image: {
        marginTop: 9,
        backgroundColor: AColor.color_lightGray_alpha
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
        marginLeft: 3,
        color:AColor.color_gray
    },
    likeComment: {
        marginTop:6,
        marginBottom: 12,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    readNum: {
        fontSize: 10,
        color:AColor.color_lightGray
    },
    likeCommentView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    likeCommentItem: {
        flexDirection: 'row',
        width: 50
    }


});

