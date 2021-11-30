//Book-objektit voi hakea tietokannasta CrudServicen avulla
//myös samalla voi poistaa yhden kirjan delete()-metodin avulla

import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Book {
  _id: String;
  name: String;
  author: String;
  price: Number;
  description: String;
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  Books: any = [];
  getId: any;
  sortedData: Book[];
  searchText = '';
  searchTerm: string | any;
  searchBooks: Book[] | any;
  allBooks: Book[] | any;

  constructor(private crudService: CrudService, private http: HttpClient) {
    this.sortedData = this.Books.slice();
  }

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  }




//Tämän olen lisännyt itse, eli tämä on just se hakukentän funktion haku
  searchbook(txt: any): void {
    console.log('*** searchbook:' + txt);
    this.crudService.GetSomeBooks(txt).subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  }

  

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      });
    }
  }

}