import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../theme';

interface Props {
  children: any;
  statusBarColor?: string;
  headerComponent?: React.ReactNode;
  disableScroll?: boolean;
  isTabScreen?: boolean;
}

export function ScreenWrapper(props: Props) {
  const insets = useSafeAreaInsets();
  const barColor = props.statusBarColor || COLORS.bg2;
  const isBlueBar = barColor === COLORS.bg1;

  return (
    <View style={[styles.mainContainer, {backgroundColor: barColor}]}>
      <StatusBar
        barStyle={isBlueBar ? 'light-content' : 'dark-content'}
        backgroundColor={barColor}
      />
      <View
        style={[
          styles.safeArea,
          {
            paddingTop: insets.top,
            paddingBottom: props.isTabScreen ? 0 : insets.bottom,
          },
        ]}>
        {props.headerComponent && props.headerComponent}
        {!props.disableScroll ? (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}>
            {props.children}
          </KeyboardAwareScrollView>
        ) : (
          <View style={styles.container}>{props.children}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});
