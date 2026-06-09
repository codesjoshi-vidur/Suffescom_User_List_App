import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, useColorScheme} from 'react-native';
import {Root, store} from './src';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Root/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
