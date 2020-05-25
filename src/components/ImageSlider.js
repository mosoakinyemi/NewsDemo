import React, {Component} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { deviceWidth, wp, hp } from '../common/constants';

export default class ImageSlider extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  state={
      currentImage:0
  }

  getPosition = (event) => {
    position = event.nativeEvent.contentOffset.x;
    if (position < 320) {
      this.setState({position: 0});
    } else if (position > 320 && position < 690) {
      this.setState({position: 1});
    } else if (position > 690) {
      this.setState({position: 2});
    }
  };
  render() {
      var newsImagesArray = this.props.newsImages
      var hasImages = newsImagesArray.length>0
    return (
      <View >
        <View style={styles.body}>
          <ScrollView
            style={styles.scrollView}
            pagingEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => this.getPosition(event)} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
            scrollEventThrottle={16}>
            {hasImages ? (
              newsImagesArray.map((image, index) => {
                return (
                  <Image
                    resizeMode="cover"
                    style={styles.newsImage}
                    source={{uri:image.image}}
                  />
                );
              })
            ) : (
              <View style={styles.noImageContainer}>
                  <Text style={styles.noImageText}>No Images Available</Text>
              </View> 
            )}
          </ScrollView>
          {
            hasImages&&
            this.renderIndicators()
          }
        </View>
      </View>
    );
  }

  renderIndicators=()=>{
    var newsImagesArray = this.props.newsImages
      return(
        <View style={styles.indicatorContainer}>
        {newsImagesArray.map((image,index) => {
            return (
            <View key={index} 
              style={[styles.dot,{
                  backgroundColor:this.state.currentImage===index?'#ffa500':'#ddd',
                }]}
            />
            
            );
        })}
        </View>
      )
  }
}

const styles = StyleSheet.create({
    noImageText:{
        color:'#cccccc',
        fontSize:hp(20),
        fontWeight:'bold',
        textAlign:'center'
    },

    noImageContainer:{
        width: deviceWidth,
        aspectRatio: 2/1    ,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#dddddd'
    },
    dot:{
        width:wp(10),
        height:wp(10),
        borderRadius:wp(5),
        marginRight:wp(15)
    },
    indicatorContainer:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:hp(15),
        alignSelf:'center'
    },
    scrollView:{
        width: deviceWidth,
        aspectRatio: 2/1       
    },
    newsImage:{
        width: deviceWidth,
        aspectRatio: 2/1
    },

});
