import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Styles, Text, LogBox, FlatList, TextInput } from 'react-native'
import { Actions } from "react-native-router-flux";

export default class TVShowListScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tvShowListArray: [],
      searchTvShowString:''

    }

  }
  _openDetailScreen = (item) => {
    Actions.push("TVShowDetailScreen", { "item": item, reloadScreenData: this._reloadData })

  }
  _onSearchButtonClick = () => {
    if(this.state.searchTvShowString){
      this._searchTvShow(this.state.searchTvShowString)
    }else{
      alert("Please enter valid text")
    }
   
  }

  _reloadData = () => {
   // this._getValues()
  }
  async componentDidMount() {
    this._getValues()
  }
  _getValues = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://api.tvmaze.com/schedule?country=US", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({ tvShowListArray: result })
      })
      .catch(error => {
        console.log('error', error)
      });


  }

  _searchTvShow = async (showName) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://api.tvmaze.com/search/shows?q="+showName, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({ tvShowListArray: result })
      })
      .catch(error => {
        console.log('error', error)
      });


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
          }}>{"Tv Show List "}</Text>
        </View>
      </View>
    )
  }
  _renderToolbar = () => {
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#F8F8F8" }}>

        {this._renderMiddle()}
      </View>
    )
  }
  _renderMessageItem = (item) => {
    console.log("item.show.image." + item.show)
    return (
      <TouchableOpacity onPress={() => this._openDetailScreen(item)} style={{ padding: 0 }}>
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

            {item.show.image ?
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
                  uri: item.show.image.medium,
                }}
              />
              : null}

            <View style={{ flex: 1, flexDirection: "column", marginStart: 8, justifyContent: "center" }}>
              {/* <Text style={{
              fontSize: 20,
              alignSelf: "flex-start",
              color: "black",
            }}>{item.name}</Text> */}
              <Text style={{
                fontSize: 16,
                alignSelf: "flex-start",
                color: "black",
              }}>{item.show.name}</Text>
              <Text style={{
                fontSize: 16,
                alignSelf: "flex-start",
                color: "green",
              }}>{item.show.type}</Text>
            </View>


          </View>

        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this._renderToolbar()}
        <View style={{ flex: 1, margin: 15, borderRadius: 10 }}>
          <View style={{flexDirection:"row"}}>
          <TextInput
            style={{
              padding: 10, marginStart: 13, marginEnd: 13, height: 40,width:"72%",
              backgroundColor: '#E0E0E0', fontSize: 20,marginBottom:10, borderRadius:8,borderColor:"black",borderWidth:1
            }}
            placeholder="Search Show Name "
            onChangeText={(searchTvShowString) => this.setState({ searchTvShowString })}
          />
          <TouchableOpacity onPress={() => this._onSearchButtonClick()} style={{ padding: 0 }}>
           <Image
                style={{
                  width: 50,
                  height: 40,
                  resizeMode: "cover",
                }}
                resizeMode='contain'
                source={require('../assets/images/ic_search.png')}
              />
            </TouchableOpacity>
          </View>
        
          <FlatList
            style={{ marginBottom: 10 }}
            data={this.state.tvShowListArray}
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