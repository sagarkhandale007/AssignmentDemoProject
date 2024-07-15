/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, TouchableHighlight, StyleSheet} from 'react-native';
function HeaderButton({onPress, image}) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPress}>
      <Image style={styles.headerIcon} source={image} />
    </TouchableHighlight>
  );
}
export default HeaderButton;
const styles = StyleSheet.create({
  headerIcon: {
    width: 30,
    height: 30,
    margin: 12,
  },
});
