// ThemeSwitcher.js
import React from 'react';
import { View, Button, StyleSheet, Pressable } from 'react-native';
import { useTheme } from './themeContext';
import { themes } from './themes';

const ThemeSwitcher = () => {
  const { changeTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => changeTheme('green')}  style={[styles.btnColorsArry, {backgroundColor: themes.green.primary}]} />
      <Pressable onPress={() => changeTheme('red')}  style={[styles.btnColorsArry, {backgroundColor: themes.red.primary}]} />
      <Pressable onPress={() => changeTheme('orange')} style={[styles.btnColorsArry, {backgroundColor: themes.orange.primary}]} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  btnColorsArry: {
    width: 50, height: 50, borderRadius: 40, marginRight: 25
},
});

export default ThemeSwitcher;
