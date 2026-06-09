import React from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../theme';
import {FONT_SIZE, SPACING} from '../theme/global.theme';

interface TabScreen {
  id: string;
  name: string;
  icon: any;
}

interface Props {
  state: any;
  navigation: any;
  screens: TabScreen[];
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const TAB_HEIGHT = Platform.OS === 'ios' ? 60 : 48;
const EXTRA_BOTTOM = SPACING.sm;

export function BottomTabBar(props: Props) {
  const bottomInset = props.insets?.bottom || 0;
  const bottomPad = bottomInset + EXTRA_BOTTOM;

  return (
    <View
      style={[
        styles.tabBar,
        {
          height: TAB_HEIGHT + bottomPad,
          paddingBottom: bottomPad,
        },
      ]}>
      {props.screens.map((screen, index) => {
        const isFocused = props.state.index === index;

        return (
          <TouchableOpacity
            key={screen.id}
            style={styles.tabItem}
            onPress={() => props.navigation.navigate(screen.name)}>
            <Image
              source={screen.icon}
              style={[styles.icon, isFocused && styles.activeIcon]}
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {screen.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  activeIcon: {
    tintColor: COLORS.bg1,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },
  activeLabel: {
    color: COLORS.bg1,
    fontWeight: '600',
  },
});
