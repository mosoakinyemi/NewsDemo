import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {deviceWidth, wp, hp, colors} from '../common/constants';

export default class ImageSlider extends Component {
  state = {
    currentImage: 0,
    rand: Math.floor(Math.random() * 100) + 1,
  };

  getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  getPosition = (event) => {
    var offset = event.nativeEvent.contentOffset.x;
    var position = Math.round(offset / deviceWidth);
    var rand = Math.floor(Math.random() * 100) + 1;
    this.setState({currentImage: position});
  };
  render() {
    var newsImagesArray = this.props.images;
    var hasImages = newsImagesArray.length > 0;
    return (
      <View>
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
                var num = this.state.currentImage * this.state.rand;
                return (
                  <Image
                    resizeMode="cover"
                    style={styles.newsImage}
                    source={{
                      uri: image.image + `?random=${num}`,
                    }}
                  />
                );
              })
            ) : (
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>No Images Available</Text>
              </View>
            )}
          </ScrollView>
          {hasImages && this.renderIndicators()}
        </View>
      </View>
    );
  }

  renderIndicators = () => {
    var newsImagesArray = this.props.images;
    return (
      <View style={styles.indicatorContainer}>
        {newsImagesArray.map((image, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    this.state.currentImage === index ? colors.accent : '#ddd',
                },
              ]}
            />
          );
        })}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  noImageText: {
    color: '#cccccc',
    fontSize: hp(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  noImageContainer: {
    width: deviceWidth,
    aspectRatio: 2 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
  dot: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(15),
  },
  indicatorContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: hp(15),
    alignSelf: 'center',
  },
  scrollView: {
    width: deviceWidth,
    aspectRatio: 2 / 1,
  },
  newsImage: {
    width: deviceWidth,
    aspectRatio: 2 / 1,
    backgroundColor: '#eee',
  },
});
