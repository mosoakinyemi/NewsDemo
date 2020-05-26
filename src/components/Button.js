import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp, colors} from '../common/constants';

export const Button = ({buttonText, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(18),
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    width: wp(100),
    height: hp(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: wp(20),
  },
});
