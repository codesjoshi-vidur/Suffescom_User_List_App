import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTab} from './BottomTab.navigation';
import {UserDetail} from '../screens';

const StackWrapper = createNativeStackNavigator();

export const Stack = () => {
  return (
    <StackWrapper.Navigator screenOptions={{headerShown: false}}>
      <StackWrapper.Screen name="BottomTab" component={BottomTab} />
      <StackWrapper.Screen name="UserDetail" component={UserDetail} />
    </StackWrapper.Navigator>
  );
};
