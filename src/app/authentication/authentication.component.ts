import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import User from '../interfaces/user.interfaces';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {

  public uuid: string = '';
  public firestore!: Firestore;
  private users!: User[];
  public logedUser!: User;

  constructor(private router: Router, private http: HttpClient, private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      console.log('List of users', users);
    });
  }


  public async doRegister(username: string, email: string, password1: string, password2: string) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    if (password1 !== password2) {
      alert('Passwords do not match');
      return;
    }

    this.logedUser = {
      password: password1,
      phone: '',
      premiun: true,
      uid: '',
      username: username,
      email: email
    };

    this.createUserWithEmailAndPassword();

  }

  public createUserWithEmailAndPassword(): string {
    var uuid: string = '';
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.logedUser.email, this.logedUser.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        this.logedUser.uid = user.uid;
        try {
          const response = this.userService.addUser(this.logedUser);
          console.log("Response ", response);
          localStorage.setItem('user', JSON.stringify(this.logedUser));

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);

        } catch (exception) {
          alert('Error creating user');
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
      });

    return uuid;
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
