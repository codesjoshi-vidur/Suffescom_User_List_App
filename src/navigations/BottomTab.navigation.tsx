import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens';
import {IMAGES} from '../assets';
import {BottomTabBar} from '../components';

const Tab = createBottomTabNavigator();

const MyScreens = [
  {
    id: '1',
    name: 'Home',
    component: Home,
    icon: IMAGES.Home,
  },
];

export function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        sceneStyle: styles.scene,
      }}
      safeAreaInsets={{top: 0, bottom: 0, left: 0, right: 0}}
      tabBar={props => <BottomTabBar {...props} screens={MyScreens} />}>
      {MyScreens.map(screen => (
        <Tab.Screen
          key={screen.id}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
