import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp, deviceWidth, deviceHeight, colors} from '../common/constants';

export const HeaderRightButton = ({buttonText, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(16),
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: wp(10),
    paddingVertical: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(2),
    borderColor: '#fff',
    marginRight: wp(20),
    borderRadius: wp(8),
  },
});
