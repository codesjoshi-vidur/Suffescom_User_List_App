import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../theme';
import {FONT_SIZE, SPACING} from '../theme/global.theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  light?: boolean;
}

export function SearchInput(props: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, props.light && styles.lightInput]}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder || 'Seach by name'}
        placeholderTextColor={props.light ? 'rgba(255,255,255,0.6)' : COLORS.gray2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.darkText1,
  },
  lightInput: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.3)',
    color: COLORS.white,
  },
});
