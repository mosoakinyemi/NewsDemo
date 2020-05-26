import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp, deviceWidth, deviceHeight, colors} from '../common/constants';
import moment from 'moment';

export const NewsItem = ({
  id,
  author,
  title,
  body,
  navigation,
  createdAt,
  fullData,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ViewNews', {
          newsId: id,
          fullData,
        })
      }
      key={id}
      style={styles.news}>
      <Text style={styles.newsAuthor}>{author}</Text>
      <View style={styles.authorTitleRow}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.timeText}>
          {moment(createdAt, 'YYYYMMDD').fromNow()}
        </Text>
      </View>
      <View style={styles.newsBodyContainer}>
        <Text style={styles.newsBody} numberOfLines={2}>
          {body}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timeText: {
    fontSize: hp(12),
    color: colors.accent,
  },
  authorTitleRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: wp(20),
  },
  newsBodyContainer: {
    width: '100%',
    // paddingLeft:wp(20),
    height: hp(60),
  },
  newsBody: {
    fontSize: hp(15),
    color: '#aaaaaa',
    marginHorizontal: wp(20),
  },

  newsTitle: {
    fontSize: hp(15),
    color: 'rgb(120,120,120)',
    marginHorizontal: wp(18),
  },
  newsAuthor: {
    fontSize: hp(18),
    color: 'rgb(70,70,70)',
    fontWeight: 'bold',
    marginLeft: wp(20),
  },
  news: {
    borderBottomWidth: hp(1),
    borderColor: '#ddd',
    width: deviceWidth,
    height: hp(100),
    justifyContent: 'center',
    marginBottom: hp(15),
  },
});
