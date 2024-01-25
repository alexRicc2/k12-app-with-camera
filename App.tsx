import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import CameraPage from './src/screens/CameraPage';
import PermissionsPage from './src/screens/PermissionsPage';
import { Routes } from './src/Routes';

const Stack = createNativeStackNavigator<Routes>()

function App(): React.JSX.Element {
  const cameraPermission = Camera.getCameraPermissionStatus();
  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);
  const showPermissionsPage = cameraPermission !== 'granted';
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.root}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'CameraPage'}
        >
          <Stack.Screen name="CameraPage" component={CameraPage} />
          <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});

export default App;
