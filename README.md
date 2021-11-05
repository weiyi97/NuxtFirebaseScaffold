# NuxtFirebaseScaffold

A scaffold Nuxt app with readily integrated Firebase Auth, Firestore and Functions. Generated with Vuetify as the design library of choice, and built as a responsive SPA (only client-side rendering). Pages that are already available are: login, signup and home page. Authenthication setup also includes a `user.js` Vuex Store and authentication plugin and middleware for route-guarding.

Created using `create-nuxt-app`.


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# Deploy to firebase hosting
$ npm run deploy

# Deploy firebase hosting + cloud functions
$ npm run deployall

#More information can be found in the package.json file
```

## First Time Setup

1. Go to `/firebase/init.js` and add your project information + api keys there
2. Edit `package.json` to change the app name and description to your own
3. In `store/user.js` and in the `login.vue` page, specify what information the user keys in for signup for their account.

In order for this app to be able to work, you will need to have already added the Firebase config details in `firebase/init.js`. Details on how to set up a Firebase project for a web app is available [here](https://firebase.google.com/docs/web/setup), and where to get the Firebase configuration is available [here](https://support.google.com/firebase/answer/7015592).
