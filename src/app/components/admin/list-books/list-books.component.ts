import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { BookInterface } from 'src/app/models/book';
import { NgForm} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  ngOnInit(): void {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth =>{
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }
  getListBooks(){
    this.dataApi.getBooks().subscribe(books => {
      this.books = books;
    });
  }
  onDeleteBook(idBook: string){
    const confirmacion = confirm('Are you sure?');
    if (confirmacion){
      this.dataApi.deleteBook(idBook);
    }

  }
  onPreUpdate(book: BookInterface){
    this.dataApi.selectedBook = Object.assign({}, book);
  }
}
