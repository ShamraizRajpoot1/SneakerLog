import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AppStyles } from '../../services/utilities/AppStyles';
import { Colors } from '../../services/utilities/Colors';
import { appIcons } from '../../services/utilities/Assets';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

const SearchBar = (props) => {
  const onClear = () => {
    if (props.onClearText) {
      props.onClearText();
    }
  };

  return (
    <View style={styles.search}>
      <Image source={appIcons.searchEvents} />
      <TextInput
        style={AppStyles.input}
        placeholder={props.Text}
        placeholderTextColor={Colors.fieldText}
        keyboardType="default"
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
      />
      {props.value && props.clear ? (
        <TouchableOpacity onPress={onClear}>
          <Image source={appIcons.clear} style={styles.clearIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  search: {
    backgroundColor:Colors.searchBackground,
    marginTop: responsiveScreenHeight(3),
    width: '90%',
    height: responsiveScreenHeight(6),
    borderWidth: scale(1),
    alignSelf: 'center',
    borderRadius: scale(50),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '3.5%',
    marginBottom: responsiveScreenHeight(2),
    color: Colors.fieldText,
    borderColor: Colors.border1,
  },
  clearIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
