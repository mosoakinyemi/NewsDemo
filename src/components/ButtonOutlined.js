import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp, deviceWidth, deviceHeight, colors} from '../common/constants';

export const ButtonOutlined = ({buttonText, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(18),
    color: colors.accent,
    fontWeight: 'bold',
  },
  button: {
    width: wp(100),
    height: hp(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(2),
    borderColor: colors.accent,
    backgroundColor: '#fff',
    borderRadius: wp(20),
  },
});
