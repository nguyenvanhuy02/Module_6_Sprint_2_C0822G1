// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:8080/anime',
  login_url: 'http://localhost:8080/anime/login',
  orderUrl: 'http://localhost:8080/order/',
  userUrl: 'http://localhost:8080/user/',
  firebaseConfig: {
    apiKey: 'AIzaSyB7ZN2AF2fr4mqhL1X6yOc9mQvlJnBDSRA',
    database: 'https://shopanime-ae6cb-default-rtdb.firebaseio.com',
    authDomain: 'shopanime-ae6cb.firebaseapp.com',
    projectId: 'shopanime-ae6cb',
    storageBucket: 'shopanime-ae6cb.appspot.com',
    messagingSenderId: '238683127641',
    appId: '1:238683127641:web:82c115ab2f9490d004d648',
    measurementId: 'G-ZV9YCQFZVN'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
