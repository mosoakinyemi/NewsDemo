import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {hp, wp, deviceWidth, deviceHeight, colors} from '../common/constants';
import {Button} from './Button';
import {ButtonOutlined} from './ButtonOutlined';

export const CreateNewsForm = ({
  authorValue,
  titleValue,
  handleAuthorInput,
  handleTitleInput,
  submitNews,
  hideForm,
  isEditingNews,
  showForm,
  modalTitle,
  submitButtonTitle,
}) => {
  //   var modalTitle = isEditingNews ? 'Edit News' : 'Add News';
  //   var submitButtonTitle = isEditingNews ? 'Update' : 'Add';
  if (showForm) {
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <TextInput
            onChangeText={(text) => handleAuthorInput(text)}
            value={authorValue}
            placeholder="Author"
            style={styles.authorInput}
          />
          <TextInput
            multiline
            placeholder="Title"
            onChangeText={(text) => handleTitleInput(text)}
            value={titleValue}
            style={styles.titleInput}
          />
          <View style={styles.buttonContainers}>
            <ButtonOutlined buttonText="Cancel" onPress={() => hideForm()} />
            <Button
              buttonText={submitButtonTitle}
              onPress={() => submitNews()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  //Comment Modal
  buttonContainers: {
    flexDirection: 'row',
    paddingTop: hp(20),
    width: '100%',
    justifyContent: 'space-evenly',
  },
  authorInput: {
    width: wp(250),
    paddingHorizontal: wp(10),
    height: hp(45),
    borderWidth: 1,
    fontSize: hp(18),
    marginBottom: wp(10),
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  titleInput: {
    fontSize: hp(18),
    width: wp(250),
    paddingHorizontal: wp(10),
    height: hp(70),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },

  modalTitle: {
    fontSize: hp(18),
    fontWeight: 'bold',
    color: '#707070',
    marginBottom: hp(15),
  },
  modalBody: {
    width: wp(340),
    paddingVertical: hp(30),
    borderRadius: wp(15),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
  },
  addCommentButton: {
    height: hp(25),
    width: wp(60),
    marginLeft: wp(40),
  },
});
