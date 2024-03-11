# SpotyROM-Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

Project developed for the implementation of a digital application that integrates up to 5 web services. The implementation is MVP, which involves creating an initial version of a product with a minimal set of features that is sufficient to attract early users and validate the concept's viability.

Additionally, the system has been developed using agile SCRUM methodologies, planned in 4 sprints:

- Sprint 1 (February 27)
- Sprint 2 (March 5)
- Sprint 3 (April 2)
- Sprint 4 (April 16)

## Startup service
Build `npm install --force` for installing the app.
Run `npm start` for starting the app. It will open automatically the path `http://localhost:4200/` in your default browser. 


## Firebase

```ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwyGJDD_pmW8vujPxUhOdw3ZHhZ4cnO6M",
  authDomain: "isi-esi.firebaseapp.com",
  projectId: "isi-esi",
  storageBucket: "isi-esi.appspot.com",
  messagingSenderId: "94353365509",
  appId: "1:94353365509:web:30865ab39fee56842d5a6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```
npm install firebase
npm install -g firebase-tools