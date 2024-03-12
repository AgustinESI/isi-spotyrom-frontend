import { Component, OnInit, ViewChild } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import User from '../interfaces/user.interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  public logedUser!: User;

  constructor() { }


  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.logedUser = JSON.parse(storedUser);
      console.log(this.logedUser);
    }
  }

  public clearLocalStorage() {
    /*
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    */
   
    localStorage.clear();
    window.location.href = "/";
  }

}
