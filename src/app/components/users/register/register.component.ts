import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email: '';
  public password: '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;



  ngOnInit(): void {
  }
  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    console.log(this.uploadPercent);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    console.log(this.urlImage);
  }
  onAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then(res => {
      this.authService.isAuth().subscribe( user => {
        if (user){
          user.updateProfile({
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            this.router.navigate(['admin/list-books']);
          }).catch(err => console.log('error', err));
        }
      });
    }).catch(err => console.log('err', err.message));
  }

}
