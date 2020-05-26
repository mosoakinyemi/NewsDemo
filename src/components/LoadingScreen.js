import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {deviceWidth, wp, hp, deviceHeight, colors} from '../common/constants';

class LoadingScreen extends Component {
  render() {
    if (this.props.news.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(250,250,250,0.6)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapState = (state) => ({
  news: state.news,
});

export default connect(mapState)(LoadingScreen);
