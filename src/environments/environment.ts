// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  emailAPI: 'http://XXXXXX.com/contact-form.php',
  database: 'firebase',
  social: {
    role: 'Guest',
    fblink: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    emailid: ''
  },
  socialAuthEnabled: true,
  firebase: {
    apiKey: "AIzaSyBhpKAv_WIAQ6rKpB8SLUqy3G9aFP8SHLQ",
    authDomain: "educacion-66163.firebaseapp.com",
    projectId: "educacion-66163",
    storageBucket: "educacion-66163.appspot.com",
    messagingSenderId: "68609324333",
    appId: "1:68609324333:web:8102b454db5d0cf63a4fa4"
  }
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
