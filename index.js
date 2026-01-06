import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await notifee.displayNotification({
    title: remoteMessage.data?.title || remoteMessage.notification?.title || 'New Message',
    body: remoteMessage.data?.body || remoteMessage.notification?.body || '',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', 
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
