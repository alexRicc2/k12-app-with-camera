import { View, Text, StyleSheet, Linking } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
type Props = NativeStackScreenProps<Routes, 'PermissionsPage'>
const PermissionsPage = ({ navigation }: Props): React.ReactElement => {

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')

  const requestCameraPermission = useCallback(async () => {
    console.log('requesting camera permission')
    const permission = await Camera.requestCameraPermission()
    console.log('camera permission status: ', permission)
    if (permission === 'denied') await Linking.openSettings()
    setCameraPermissionStatus(permission)
  }, [])

  useEffect(() => {
    if (cameraPermissionStatus === 'granted') navigation.replace('CameraPage')

  }, [cameraPermissionStatus, navigation])

  return (
    <View>
      <Text>Vision camera.</Text>
      <View>
        {cameraPermissionStatus !== 'granted' && (
          <Text>
            Vision camera needs <Text> Camera permissions</Text> {' '}
            <Text onPress={requestCameraPermission}>Grant</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default PermissionsPage;
