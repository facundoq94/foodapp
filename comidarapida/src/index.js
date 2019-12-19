import React, { Component } from 'react';
import { Text, 
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import Swiper from 'react-native-swiper';

var { height, width } = Dimensions.get("window");

export default class App extends Component {


  //CREA VARIABLES  
  constructor(props) {
      super(props);
      this.state = {
          dataBanner:[],
          dataCategories:[],
          selectCat:0
      }
  }

  //ASIGNA A VARIABLES LOS VALORES DEL JSON 
  componentDidMount() {
      const url = "http://tutofox.com/foodapp/api.json";
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
              isLoading: false,
              dataBanner: responseJson.banner,
              dataCategories: responseJson.categories,
          })
      })
      .catch((error)  => {
          console.log(error)
      })

  }


  //RENDER 
  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View style={{ width: width, alignItems: 'center'}}>
         {/* TOPBAR */}
        <Image resizeMode="contain" style={{height: 60, width:width/2, margin:10}} source={{uri: "http://tutofox.com/foodapp/foodapp.png"}}/>
        
        {/* SWIPER */}
        <Swiper style={{ height: width/2 }} autoplay={true} autoplayTimeout={2}>
            {
                
                //OBTIENE/MAPEA LOS 3 ELEMENTOS DEL JSON "BANNER". IMAGENES
                this.state.dataBanner.map((itemmap) => {
                    return(
                        <Image style={styles.imagebanner} resizeMode="contain" source={{ uri: itemmap }} />
                    )
                })
            }
        </Swiper>
        </View>

        <View style={{ width: width, borderRadius:20, paddingVertical:20, backgroundColor: "white"}}>
    
        {/* CATEGORIAS */}
        <Text style={styles.titleCat}> Categorias {this.state.selectCat} </Text> 
        
        {/* OBTIENE LA DATA DEL JSON, Y ENVIA ITEM A LA FUNCION _renderItem */}
        
        <FlatList
            horizontal={true}
            data={this.state.dataCategories}
            renderItem={({item}) => this._renderItem(item)}
            keyExtractor = {(item, index) => index.toString()}
        />
        
        </View>
      </View>
      </ScrollView>
    );
  }

  //FUNCIÓN QUE RECIBE ITEM CATEGORIA Y USA LOS DATOS PARA UNA TOUCHABLEOPACITY (ITEM.CAMPO)
  _renderItem(item) {
      return(
        <TouchableOpacity 
            onPress={()=> this.setState({selectCat: item.id})}
            style={[styles.divCat, {backgroundColor: item.color}]}>
            <Image
                style={{width: 100, height:80}}
                resizeMode="contain"
                source={{uri: item.image}}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                { item.name } 
            </Text>   
        </TouchableOpacity>
      )
  }

}



const styles = StyleSheet.create({
    imagebanner: {
        height: width/2,
        width: width-40,
        borderRadius: 10,
        marginHorizontal: 20
    },
    titleCat: {
        fontSize:30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    divCat: {
        backgroundColor: 'red',
        margin: 5,
        alignItems: 'center',
        borderRadius: 10,
        padding: 10

    }

})