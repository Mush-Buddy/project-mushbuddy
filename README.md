# Mush-Buddy 🍄

A mobile application for mushroom identification.

## Team

* **Anshul Barnwal**
* **Jacob Chen**
* **Michelle Chen**: Frontend development, UI/UX
* **Emilie Hopkinson**
* **Bibaswan Khadka**: Backend, Frontend

## Technologies

### Development platforms

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* Express
* MongoDB

## User setup: A guide to local installation

Mush-Buddy is an app developed for mobile devices. It should be run either through your computer's iOS/Android Simulator, or installed through Expo Go onto your iOS/Android.

**On your computer:**

1. Visit expo.io to register an Expo account (for free).
2. Install node: `brew install node`
3. Install Watchman, a dependency of React Native: `brew install watchman`
4. Install the Expo CLI: `npm install expo-cli --global`
5. Create a local version of the project: `git clone https://github.com/Mush-Buddy/project-mushbuddy.git`
6. Navigate to the project directory (and the app subdirectory): `cd project-mushbuddy/mushbuddy-app`
7. Download all packages necessary for the app to run: `npm install`
8. Download the server repo from https://github.com/Mush-Buddy/mushbuddy-backend and follow the instructions to install and run the server in a seperate tab. 
9. Start up Expo: `expo start`
10. Expo will present multiple options for you to run the project; for optimal performance, choose iOS Simulator.
11. ⚠️ While running the simulator, you may encounter an error that reads, "React Native version mismatch." To resolve the error, update your local version of React Native to the most recent one.

**On your mobile device:**

1. Install Expo Go from the App Store (available on iOS & Android).
2. [further instructions coming soon]

## Acknowledgments

Thanks to Sebastian Joosten for guidance throughout development.
