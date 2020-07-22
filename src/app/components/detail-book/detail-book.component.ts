import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { BookInterface } from 'src/app/models/book';
import { ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  public book: BookInterface = {};
  ngOnInit(): void {
    const idBook = this.route.snapshot.params.id;
    this.getDetails(idBook);
  }
  getDetails(idBook: string){
    this.dataApi.getOneBook(idBook).subscribe(book => {
      this.book = book;
    })
  }
}
