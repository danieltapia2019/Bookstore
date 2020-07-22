import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { BookInterface } from 'src/app/models/book';
import { NgForm} from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('cerrar') btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit(): void {
  }
  onSaveBook(bookForm: NgForm){
    //save
    if (bookForm.value.id == null){
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    }
    //update
    else {
      this.dataApi.updateBook(bookForm.value);
    }
    this.resetForm(bookForm);
  }

  resetForm(bookForm: NgForm){
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}


