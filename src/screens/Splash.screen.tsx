import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../theme';
import {FONT_SIZE, SPACING} from '../theme/global.theme';

export const Splash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>S</Text>
      </View>

      <Text style={styles.title}>Suffescom</Text>
      <Text style={styles.subTitle}>User List App</Text>

      <Text style={styles.footerText}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.bg1,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
  },
  subTitle: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.secondary,
    marginTop: SPACING.sm,
  },
  footerText: {
    position: 'absolute',
    bottom: 50,
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    opacity: 0.7,
  },
});
