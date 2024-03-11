import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { FormControl, FormGroup } from '@angular/forms';
import { firebase_enviorement } from '../../enviorements/environment';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  public name: string = '';
  public email: string = '';
  public pwd1: string = '';
  public pwd2: string = '';
  public uuid: string = '';
  public db: any; 

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const app = initializeApp(firebase_enviorement);
    this.db = getFirestore(app);
    const alovelaceDocumentRef = doc(this.db, 'users', 'prueba');
  }


  public async doRegister(username: string, email: string, password1: string, password2: string) {
    this.name = username;
    this.email = email;
    this.pwd1 = password1; 
    this.pwd2 = password1;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Invalid email format');
      return;
    }

    if (this.pwd1 !== this.pwd2) {
      alert('Passwords do not match');
      return;
    }
    
    this.createUserWithEmailAndPassword();


    /*
    console.log(this.db)
    var docRef = await setDoc(doc(this.db, "user", this.email), {
      password: this.pwd1,
      username: this.name,
      premiun: true,
      uid: this.uuid,
      phone: '666 66 66 66'
    });

    
    console.log("Document written with ID: ", docRef);
    */
  }

  public createUserWithEmailAndPassword() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.pwd1)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem('active', "false");
        if (user.email) {
          localStorage.setItem('user_name', user.email);
        }
        localStorage.setItem('user_id', user.uid);
        this.uuid = user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
      });
  }

  public signInWithEmailAndPassword() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "cherry@gmail.com", "this.pwd1")
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage)
      });
  }

  public signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  loginGoogle() {

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    /*
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    */

    const auth = getAuth();
    auth.languageCode = 'es';
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(errorCode + " - " + errorMessage + " - " + email + " - " + credential);
      });


  }

}
