import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {hp, wp, deviceWidth, deviceHeight, colors} from '../common/constants';
import moment from 'moment';

export const CommentItem = (props) => {
  const {id, name, avatar, comment, createdAt} = props.commentData;
  const {onPressEdit, onPressDelete} = props;
  return (
    <View key={id} style={styles.commentContainer}>
      <Image source={{uri: avatar}} style={styles.userAvatar} />

      <View style={styles.body}>
        <View style={styles.authorTitleRow}>
          <Text style={styles.newsAuthor}>{name}</Text>
          <Text style={styles.timeText}>
            {moment(createdAt).startOf('hour').fromNow()}
          </Text>
        </View>
        <View style={styles.newsBodyContainer}>
          <Text style={styles.newsBody} numberOfLines={2}>
            {comment}
          </Text>
        </View>
      </View>
      <View style={styles.editDeleteContainer}>
        <TouchableOpacity
          onPress={() => onPressEdit(id, name, comment)}
          style={[styles.rightButton, {borderColor: colors.accent2}]}>
          <Text style={[styles.rightButtonText, {color: colors.accent2}]}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressDelete(id)}
          style={styles.rightButton}>
          <Text style={styles.rightButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editDeleteContainer: {
    width: wp(80),
    justifyContent: 'space-evenly',
    height: '100%',
  },
  rightButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: hp(12),
    textAlign: 'center',
  },
  rightButton: {
    width: wp(50),
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: wp(5),
    borderWidth: 1,
  },
  userAvatar: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(50),
  },
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
  newsAuthor: {
    fontSize: hp(18),
    color: 'rgb(70,70,70)',
    fontWeight: 'bold',
    marginLeft: wp(20),
  },
  body: {
    flex: 1,
  },
  commentContainer: {
    borderBottomWidth: hp(1),
    borderColor: '#ddd',
    width: deviceWidth,
    height: hp(80),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: hp(15),
    paddingRight: wp(20),
    // flex:1
  },
});
