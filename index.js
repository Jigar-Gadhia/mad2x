/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App.js';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store.js';

// import PushNotification from 'react-native-push-notification';
// import OneSignal, { NotificationReceivedEvent } from 'react-native-onesignal';

// OneSignal.setAppId('8182b668-d98a-45c1-88d3-c34d9b8ee2d6');

// OneSignal.promptForPushNotificationsWithUserResponse();

// OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
//     console.log("notification will show in foreground", notificationReceivedEvent);
//     const notification = notificationReceivedEvent.getNotification();
//     console.log("notification: ", notification);
//     const data = notification.additionalData();
//     console.log("additional data", data);
//     notificationReceivedEvent.complete(notification);
// });

// OneSignal.setNotificationOpenedHandler(notification => {
//     console.log("notification opened: ", notification)
// });

// PushNotification.configure({

//     onRegister: function (token) {
//         console.log("TOKEN:", token);
//     },

//     onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//     },

//     onAction: function (notification) {
//         console.log("ACTION:", notification.action);
//         console.log("NOTIFICATION:", notification);

//         // process the action
//     },

//     onRegistrationError: function (err) {
//         console.error(err.message, err);
//     },

//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//     },

//     popInitialNotification: true,
//     requestPermissions: true
// })

const MadRedux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => MadRedux);
