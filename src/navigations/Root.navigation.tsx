import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Splash} from '../screens';
import {Stack} from './Stack.navigation';

const SPLASH_TIME = 3500;

export const Root = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, SPLASH_TIME);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isSplashVisible ? <Splash /> : <Stack />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
