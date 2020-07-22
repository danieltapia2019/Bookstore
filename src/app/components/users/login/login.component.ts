import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public email: string = '';
  public password: string = '';
  ngOnInit(): void {
  }

  onLogin(): void{

    this.authService.loginEmailUser(this.email, this.password)
    .then(res => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));

  }


  onLoginGoogle(){
    this.authService.loginGoogleUser()
    .then(res => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));

  }
  onLoginFacebook(){
    this.authService.loginFacebookUser()
    .then(res => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }
  onLogout(){
    this.authService.logoutUser();
  }

  onLoginRedirect(){
    this.router.navigate(['admin/list-books']);
  }
}
