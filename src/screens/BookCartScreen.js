import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Styles, Text, LogBox, FlatList } from 'react-native'
import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';

const Badge = ({ count }) => (
    <View style={{
        width: 30,
        height: 30,
        marginTop: 0,
        marginStart:10,
        marginEnd: 0,
        marginBottom: 30,
        borderRadius: 10, //half radius will make it cirlce,
        backgroundColor: '#F2B337',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text style={{ color: '#FFF' }}>{count}</Text>
    </View>
);

export default class BookCartScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartArray: []
        }

    }
    componentWillUnmount() {
        if (this.props.reloadScreenData) this.props.reloadScreenData()
    }
    _removeFromCart = async (bookItem) => {

        const filteredData = this.state.cartArray.filter(item => item.name !== bookItem.name);
        this.setState({ cartArray: filteredData });

        console.log("****"+JSON.stringify(filteredData))

        alert("Item Removed")
        
        // var cartArray = this.state.cartArray.push({ id: filteredData.id, name: filteredData.name,
        //      author: filteredData.author, imgUrl: filteredData.imgUrl });
        //  this.setState({ cartArray })

        setTimeout(() => {

            const stringifiedCartArray = JSON.stringify(filteredData)
      
            AsyncStorage.setItem('cartArray', stringifiedCartArray)
              .then(json => console.log('success!'))
              .catch(error => console.log('error!'));
      
          }, 1000);
    
      }

    async componentDidMount() {

        var getValue = await AsyncStorage.getItem('cartArray')
            .then(req => JSON.parse(req))
            .then(json => {
                this.setState({ cartArray: json })
            })
            .catch(error => console.log('error!'));



    }

    _renderMiddle = () => {
        return (

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.loginTitleStyle}>
                    <Text style={{
                        fontSize: 18,
                        padding: 5,
                        margin: 10,
                        alignSelf: "flex-start",
                        color: "black",
                    }}>{"Cart"}</Text>
                </View>
            </View>
        )
    }

    _renderBack() {
        return (
            <TouchableOpacity onPress={Actions.pop} style={{ padding: 16 }}>
                <Image
                    style={{
                        width: 30,
                        height: 24,
                        marginTop: 0,
                        alignSelf: 'center',
                        tintColor: "black"
                    }}
                    resizeMode='contain'
                    source={require('../assets/images/ic_back_btn.png')}
                />

            </TouchableOpacity>
        )
    }



    _renderToolbar = () => {
        return (
            <View style={{ flexDirection: "row", backgroundColor: "#F8F8F8" }}>
                {this._renderBack()}
                {this._renderMiddle()}

            </View>
        )
    }

    _renderMessageItem = (book) => {
        return (
            <View
                style={{
                    padding: 10,
                    margin: 15,
                    marginTop: 0,
                    borderRadius: 10,
                    backgroundColor: "white"
                }}
            >
                <View style={{ flex: 1, flexDirection: "row" }}>

                    <Image
                        style={{
                            width: 70,
                            height: 70,
                            padding: 10,
                            borderRadius: 5,
                            resizeMode: "cover",
                            alignSelf: 'center',
                            alignContent: "center",
                            justifyContent: "center"
                        }}
                        resizeMode='contain'
                        source={{
                            uri: book.imgUrl,
                        }}
                    />

                    <View style={{ flex: 1, flexDirection: "column", marginStart: 8, justifyContent: "center" }}>
                        <Text style={{
                            fontSize: 16,
                            alignSelf: "flex-start",
                            color: "black",
                        }}>{book.name}</Text>
                        <Text style={{
                            fontSize: 14,
                            alignSelf: "flex-start",
                            color: "black",
                        }}>{book.author}</Text>
                    </View>

                    <TouchableOpacity style={{ padding: 16 }}
            onPress={() => this._removeFromCart(book)}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                padding: 10,
                alignSelf: 'center',
                tintColor: "blue",
                justifyContent: "flex-end",
                position: 'absolute',
                bottom: 0,
                right: 5
              }}
              resizeMode='contain'
              source={require('../assets/images/icon_remove.png')}
            />
          </TouchableOpacity>

                </View>

            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {this._renderToolbar()}
                <View style={{ flex: 1, margin: 15, borderRadius: 10 }}>
                    <View style={{  flexDirection: "row", marginBottom: 0 }}>

                        {this.state.cartArray != null ?
                            <Badge count={this.state.cartArray.length} />
                            : <Badge count={"0"} />}

                        <Text style={{
                            fontSize: 14,
                            marginStart:10,
                            marginTop:5,
                            alignSelf: "flex-start",
                            color: "black",
                        }}>{"Added"}</Text>

                    </View>

                    <FlatList
                        style={{ marginBottom: 10,marginTop:5 }}
                        data={this.state.cartArray}
                        extraData={this.state}
                        renderItem={({ item }) => this._renderMessageItem(item)}
                        keyExtractor={item => item.key}
                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: "white"
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#EFEFEF"
    },
    backButtonImage: {
        width: 30,
        height: 24,
        marginTop: 0,
        alignSelf: 'center',
        tintColor: "gray"
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18, //half radius will make it cirlce,
        backgroundColor: 'red'
    },
    count: { color: '#FFF' }

})