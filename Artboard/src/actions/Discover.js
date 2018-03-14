// import React, { Component } from 'react';
// import { Text, FlatList } from 'react-native';
//
//
//
//
// export default class Discover extends Component {
//     // state = {selected: (new Map(): Map<string, boolean>)};
//
//     constructor(props) {
//         super(props);
//
//         this.state = {refreshing: false}
//     }
//
//     render() {
//         return(
//             <FlatList
//                 data={[{key: 'a'}, {key: 'b'}]}
//                 renderItem={({item}) => <Text>{item.key}</Text>}
//                 refreshing={ this.state.refreshing }
//                 onRefresh={ this._renderRefresh }
//             />
//         )
//     }
//
//
//     // 下拉刷新
//     _renderRefresh = () => {
//         this.setState({refreshing: true}) // 开始刷新
//         // 这里模拟请求网络，拿到数据，3s后停止刷新
//         setTimeout(() => {
//             // TODO 提示没有可刷新的内容！
//             this.setState({refreshing: false});
//         }, 3000);
//     };
// }


import React, {Component} from 'react'
import {
    Image,
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Platform,
    ActivityIndicator
} from 'react-native'
import nativeImageSource from 'nativeImageSource'


export default class Discover extends Component {
    render() {
        return (
            <ImageLoadCallbackComponent
                source={{uri: 'http://origami.design/public/images/bird-logo.png?r=1&t=1'}}
                prefetchedSource={{uri: IMAGE_PREFETCH_URL}}
            />
        )
    }
}

const IMAGE_PREFETCH_URL = 'http://origami.design/public/images/bird-logo.png?r=1&t=1';
var prefetchTask = Image.prefetch(IMAGE_PREFETCH_URL);

class ImageLoadCallbackComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            startLoadPrefetched: false,
            mountTime: new Date()
        }
    }

    componentWillMount() {
        this.setState({
            mountTime: new Date()
        })
    }

    render() {
        var {mountTime} = this.state
        return (
            <View>
                <Image
                    source={this.props.source}
                    style={[styles.base, {overflow: 'visible'}]}
                    onLoadStart={() => this._loadEventFired(`✔ onLoadStart (+${new Date() - mountTime}ms)`)}
                    onLoad={(event) => {
                        if (event.nativeEvent.source) {
                            const url = event.nativeEvent.source.url
                            this._loadEventFired(`✔ onLoad (+${new Date() - mountTime}ms) for URL ${url}`)
                        } else {
                            this._loadEventFired(`✔ onLoad (+${new Date() - mountTime}ms)`);
                        }
                    }}
                    onLoadEnd={() => {
                        this._loadEventFired(`✔ onLoadEnd (+${new Date() - mountTime}ms)`);
                        this.setState({startLoadPrefetched: true}, () => {
                            prefetchTask.then(() => {
                                this._loadEventFired(`✔ Prefetch OK (+${new Date() - mountTime}ms)`);
                            }, error => {
                                this._loadEventFired(`✘ Prefetch failed (+${new Date() - mountTime}ms)`);
                            })
                        })
                    }}
                />
                {this.state.startLoadPrefetched ? <Image
                    source={this.props.prefetchedSource}
                    style={[styles.base, {overflow: 'visible'}]}
                    onLoadStart={() => this._loadEventFired(`✔ (prefetched) onLoadStart (+${new Date() - mountTime}ms)`)}
                    onLoad={(event) => {
                        if (event.nativeEvent.source) {
                            const url = event.nativeEvent.source.url
                            this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms) for URL ${url}`)
                        } else {
                            this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms)`);
                        }
                    }}
                    onLoadEnd={() => this._loadEventFired(`✔ (prefetched) onLoadEnd (+${new Date() - mountTime}ms)`)}
                /> : null}
                <Text style={{marginTop: 20}}>
                    {this.state.events.join('\n')}
                </Text>
            </View>
        )
    }

    _loadEventFired(event) {
        this.setState((state) => {
            return state.events = [...state.events, event]
        })
    }
}


const styles = StyleSheet.create({
    base: {
        width: 38,
        height: 38,
    },
    horizontal: {
        flexDirection: 'row'
    },
    icon: {
        width: 15,
        height: 15,
    },
    background: {
        backgroundColor: '#222222'
    },
    nestedText: {
        marginLeft: 12,
        marginTop: 20,
        backgroundColor: 'transparent',
        color: 'white'
    },
    resizeMode: {
        width: 90,
        height: 60,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    gif: {
        flex: 1,
        height: 200,
    },
})