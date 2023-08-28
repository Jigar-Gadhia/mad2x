# Mad2x
Mad2x is a mobile client application built using React Native that allows users to book doctor appointments easily and conveniently. The app leverages various libraries and dependencies to provide a seamless user experience.

![image](https://github.com/Jigar-Gadhia/mad2x/assets/65450057/5fb5c31b-b735-491a-959e-3b4adae2f712)

# Features
1. Browse a list of doctors and their available time slots.
2. Book appointments with preferred doctors.
3. Receive notifications for appointment reminders and updates.
4. View and manage upcoming appointments.
5. User-friendly interface with smooth animations.

# Disclaimer
This project is under development. Only Android app is ready for preview, IOS App is yet to build.

# Following features are in progress
1. Appointment Booking
2. Appointment Reminder
3. Drawer Navigation

# Installation
1. Clone your repository.
```   
git clone https://github.com/your-username/mad2x.git

cd mad2x
```
2. Install the required dependencies:
```
npm install
# or
yarn install
```
# Running the App
## Android

   Open command prompt / terminal inside the root directory of the project and run following command :

   ```
   cd android/app
   ```
   
  Create debug keystore :
   
   ```
   keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
   ```
   
   Make sure app/build.gradle file contain following details:
   ```
android {
    ...
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        ...
    }
    ...
    signingConfigs {
        debug {
            storeFile file('relative/path/to/your/debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        ...
    }
    ...
}
   ```
 Clean the project by running following commands in terminal / command prompt from the project's root directory: 
```
cd android
```
For windows
```
gradlew clean 
```
For Linux / Mac
```
./gradlew clean
```
      
  Run Android :
```
npm run android
# or
yarn android
# or
npx react-native run-android # I personally use this command
```
# Dependencies
Please refer [Package.json](https://github.com/Jigar-Gadhia/mad2x/blob/main/package.json) for more information

# Development Dependencies
Please refer [Package.json](https://github.com/Jigar-Gadhia/mad2x/blob/main/package.json) for more information

# License
This project is licensed under the [MIT License](https://github.com/Jigar-Gadhia/mad2x/blob/main/LICENSE)

# Acknowledgments
We would like to thank the contributors and all the open-source libraries that made this project possible.
