import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions,
    Image
} from 'react-native';
import {StackNavigator, TabNavigator} from "react-navigation";

import Global from '../src/config/Global'
import BroadList from '../src/actions/BroadList'
import Discover from '../src/actions/Discover'
import Mess from '../src/actions/Mess'
import Me from '../src/actions/Me'
import Login from '../src/actions/Login'

const { width , height} = Dimensions.get('window');

export default class App extends Component {
    render() {
        return(
            <View style={{flex:1, backgroundColor: 'blue'}}>
                <TabView></TabView>
            </View>
        )
    }
}
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor:'red'
    },
});


// const MyNavScreen = ({ navigation, banner }) => (
//     <ScrollView style={styles.container}>
//
//         {/*<Button*/}
//             {/*onPress={() => navigation.navigate('Home')}*/}
//             {/*title="Go to home tab"*/}
//         {/*/>*/}
//         {/*<Button*/}
//             {/*onPress={() => navigation.navigate('Settings')}*/}
//             {/*title="Go to settings tab"*/}
//         {/*/>*/}
//         {/*<Button*/}
//             {/*onPress={() => navigation.goBack(null)}*/}
//             {/*title="Go back"*/}
//         {/*/>*/}
//     </ScrollView>
// );

class MyNavScreen extends Component {
    render() {
        // const { navigate, banner } = this.props.navigation;
        return (
            <View style={styles.container}></View>
        )
    }
}

class BroadListScreen extends Component {
    render() {
        return (
            <MyNavScreen>
                <BroadList/>
            </MyNavScreen>
        )
    }
}

class DiscoverScreen extends Component {
    render() {
        return (
            <MyNavScreen>
                <Discover/>
            </MyNavScreen>
        )
    }
}

class MessScreen extends Component {
    render() {
        return (
            <MyNavScreen>
                <Mess/>
            </MyNavScreen>
        )
    }
}

class MeScreen extends Component {
    render() {
        return (
            <MyNavScreen>
                <Me/>
            </MyNavScreen>
        )
    }
}



const TabView = TabNavigator({
    BroadList: {
        screen: BroadListScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21, marginTop:10}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_list_selected.png') : require('../src/images/tabBar_list.png')}
                />
            )
        },
    },
    Discover: {
        screen: DiscoverScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21, marginTop:10}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_home_selected.png') : require('../src/images/tabBar_home.png')}
                />
            )
        },
    },
    Mess: {
        screen: MessScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21, marginTop:10}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_chat_selected.png') : require('../src/images/tabBar_chat.png')}
                />
            )
        },
    },
    Me: {
        screen: MeScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image style={{width: 21, height: 21, marginTop:10}} resizeMode='contain'
                       source={focused ? require('../src/images/tabBar_me_selected.png') : require('../src/images/tabBar_me.png')}
                />
            )
        },
    },
}, {
    tabBarOptions: {
        activeTintColor: Global.color_blue,
        inactiveTintColor: Global.color_lightBlue
    },
});
