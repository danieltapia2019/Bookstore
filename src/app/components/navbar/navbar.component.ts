import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { AngularFireAuth} from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  // tslint:disable-next-line: variable-name
  public app_name = 'BookStore';
  public isLogged = false;
  ngOnInit(): void {
    this.getCurrentUser();
  }
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if (auth){
        console.log('user logged');
        this.isLogged = true;
      }
      else {
        console.log('not logged user');
        this.isLogged = false;
      }

    });

  }
  onLogout(){
    this.afsAuth.signOut();
  }

}
