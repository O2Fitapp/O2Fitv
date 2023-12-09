import 'react-native-reanimated';

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //   method: 'POST',
    // });

    // Remove the notification
    onMessageReceived(notification)
    await notifee.cancelNotification(notification.id);
  }
});

function onMessageReceived(message) {
  
  const { body, title } = message.notification
  notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId: 'General',
      smallIcon: 'ic_notification',
      asForegroundService: false,
    },
    ios: {
      smallIcon: 'default', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });

  // notifee.displayNotification(JSON.parse(message.data.custom_notification));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

PushNotification.configure({
  largeIcon: "ic_notification",
  smallIcon: "ic_notification",
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.error("FCM TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.error("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.error("ACTION:", notification.action);
    console.error("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error('notification error', err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
