// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDpp0hVAEvXbjFE7ul9N0Y1J0CgDhNa9fk",
    authDomain: "parking-booking-system.firebaseapp.com",
    databaseURL: "https://parking-booking-system.firebaseio.com",
    storageBucket: "parking-booking-system.appspot.com",
    messagingSenderId: "366624095308"
  }
  
};
