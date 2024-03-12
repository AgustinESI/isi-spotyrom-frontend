import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import User from '../interfaces/user.interfaces';
import { Firestore } from '@angular/fire/firestore';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  public logedUser!: User;

  constructor(private router: Router, private http: HttpClient, private userService: UsersService) {
  }

  ngOnInit(): void {
  }



  public async doLogin(email: string, password: string) {
    if (!email && !password) {
      alert('Empty fields');
    }
    this.logedUser = {
      password: password,
      phone: '',
      premiun: false,
      uid: '',
      username: '',
      email: email
    };
    this.signInWithEmailAndPassword();
  }


  private signInWithEmailAndPassword() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.logedUser.email, this.logedUser.password).then((userCredential) => {

      const user = userCredential.user;
      this.userService.getUser(user.uid).subscribe((users) => {
        this.logedUser = users[0];
        localStorage.setItem('user', JSON.stringify(this.logedUser));
        window.location.href = "/";
      });
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage)
      });
  }

  redirect() {
    window.location.href = "/authenticate";
  }

}
