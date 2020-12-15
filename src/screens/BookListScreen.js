import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Styles, Text, LogBox, FlatList } from 'react-native'
import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';

const Badge = ({ count }) => (
  <View style={{
    width: 20,
    height: 20,
    marginTop: 15,
    marginEnd: 0,
    borderRadius: 10, //half radius will make it cirlce,
    backgroundColor: '#F2B337',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Text style={{ color: '#FFF' }}>{count}</Text>
  </View>
);

export default class BookListScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      booksArray: [
        {
          id: 1,
          name: 'The Book Thief',
          author: 'Markus Zusak',
          imgUrl:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522157426l/19063._SY475_.jpg'
        },
        {
          id: 2,
          name: 'Sapiens',
          author: 'Yuval Noah Harari',
          imgUrl:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1420585954l/23692271.jpg'
        },
        {
          id: 3,
          name: 'Crime and Punishment',
          author: 'Fyodor Dostoyevsky',
          imgUrl:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1382846449l/7144.jpg'
        },
        {
          id: 4,
          name: 'No Longer Human',
          author: 'Osamu Dazai',
          imgUrl:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1422638843l/194746.jpg'
        },
        {
          id: 5,
          name: 'Atomic Habits',
          author: 'James Clear',
          imgUrl:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg'
        },
        {
          id: 7,
          name: 'Dune',
          author: 'Frank Herbert',
          imgUrl:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1434908555l/234225._SY475_.jpg'
        },
        {
          id: 8,
          name: 'Atlas Shrugged',
          author: 'Ayn Rand',
          imgUrl:
            'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1405868167l/662.jpg'
        }
      ],
      cartArray: [],
      cartCountArray: []
    }

  }
  _openCartScreen = () => {
    Actions.push("BookCartScreen", { reloadScreenData: this._reloadData })

  }
  _reloadData = () => {
    this._getValues()
  }

  _addToCart = async (bookItem) => {

    var cartArray = this.state.cartArray.concat({ id: bookItem.id, name: bookItem.name, author: bookItem.author, imgUrl: bookItem.imgUrl });
    this.setState({ cartArray })

    setTimeout(() => {

      const stringifiedCartArray = JSON.stringify(this.state.cartArray)


      AsyncStorage.setItem('cartArray', stringifiedCartArray)
        .then(json => console.log('success!'))
        .catch(error => console.log('error!'));

    }, 1000);

    alert("Item Added")
    setTimeout(() => {
      this._getValues()
    }, 1000);

  }

  async componentDidMount() {

    this._getValues()
  }
  _getValues = async () => {
    await AsyncStorage.getItem('cartArray')
      .then(req => JSON.parse(req))
      .then(json => {

        if (json) {
          console.log(" $$123" + json)
          this.setState({ cartCountArray: json })
        } else {
          console.log(" $$2" + json)
          this.setState({ cartCountArray: [] })
          // alert(this.state.cartCountArray.length)
        }

      })
      .catch(error => {
        console.log('error!')
      });

    // console.log("*******ArrayLenght"+this.state.cartCountArray.length)

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
          }}>{"Book Shop"}</Text>
        </View>
      </View>
    )
  }

  _renderNotificationBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => this._openCartScreen()}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          {this.state.cartCountArray != null ?
            <Badge count={this.state.cartCountArray.length} />
            : null}

          <Image
            style={{
              width: 30,
              height: 24,
              margin: 15,
              padding: 5,
              alignSelf: 'center',
              tintColor: "gray",
              alignContent: "center",
              justifyContent: "center"
            }}
            resizeMode='contain'
            source={require('../assets/images/icon_shopping.png')}
          />
        </View>

      </TouchableOpacity>
    )
  }

  _renderToolbar = () => {
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#F8F8F8" }}>

        {this._renderMiddle()}
        {this._renderNotificationBtn()}
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
            onPress={() => this._addToCart(book)}
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
              source={require('../assets/images/add_icon.png')}
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
          <FlatList
            style={{ marginBottom: 10 }}
            data={this.state.booksArray}
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