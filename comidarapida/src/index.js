import React, { Component } from 'react';
import { Text, 
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Image
} from 'react-native';

import Swiper from 'react-native-swiper';

var { height, width } = Dimensions.get("window");

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          dataBanner:[]
      }
  }

  componentDidMount() {
      const url = "http://tutofox.com/foodapp/api.json";
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
              isLoading: false,
              dataBanner: responseJson.banner
          })
      })
      .catch((error)  => {
          console.log(error)
      })

  }

  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View style={{ width: width, alignItems: 'center'}}>
        <Image resizeMode="contain" style={{height: 60, width:width/2, margin:10}} source={{uri: "http://tutofox.com/foodapp/foodapp.png"}}/>
        <Swiper style={{ height: width/2 }} autoplay={true} autoplayTimeout={2}>
            {
                this.state.dataBanner.map((itemmap) => {
                    return(
                        <Image style={styles.imagebanner} resizeMode="contain" source={{ uri: itemmap }} />
                    )
                })
            }
        </Swiper>
        </View>
        <Text>App Delivery </Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    imagebanner: {
        height: width/2,
        width: width-40,
        borderRadius: 10,
        marginHorizontal: 20
    }

})