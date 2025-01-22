// ThemedButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './themeContext';
import { themes } from './themes';

const ThemedButton = ({ title, onPress }) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: currentTheme.primary }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: currentTheme.secondary }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default ThemedButton;
