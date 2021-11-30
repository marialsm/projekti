//Book-objektit voi hakea tietokannasta CrudServicen avulla
//myös samalla voi poistaa yhden kirjan delete()-metoodin avulla

import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
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
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //  updateForm: FormGroup;

  constructor(private crudService: CrudService, private http: HttpClient) {
    // this.updateForm = 0;
    this.sortedData = this.Books.slice();
  }

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  }

  //Yritin luoda funktiot hakukenttää varten myös tähän
  ngOnInit2(): void {
    this.http.get<Book[]>('./service/Book').subscribe((data: Book[]) => {
      this.searchBooks = data;
      this.allBooks = this.searchBooks;
    });
  }

  //Jotka eivät sitten toimineet
  searchMBooks(value: string): void {
    this.Books = this.allBooks.filter((val: { name: string }) =>
      val.name.toLowerCase().includes(value)
    );
  }

  // searchMBooks(value: string): void {
  //   this.searchBooks = this.allBooks.filter((val: { name: string; }) => val.name.toLowerCase().includes(value));
  // }

  //Tämän olen lisännyt myös itse
  // Yritin luoda toisen funktion hakukenttää varten
  /* searchBookOld(): void {
    this.crudService.SearchBook().subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  } */

  searchbook(txt: any): void {
    console.log('*** searchbook:' + txt);
    this.crudService.GetSomeBooks(txt).subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  }

  /* authorFilter(): void {
    this.crudService.FilterAuthor().subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  } */

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      });
    }
  }

  //Tähän yritin lisätä omat filtterit, mitkä eivät toimi. Mutta ideana oli, että pystyisi näkemään kirjoja nimen,
  //kirjalijan ja hinnan perusteella nousevassa ja laskevassa järjestyksissä.
  sortData(sort: Sort) {
    const data = this.Books.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort(
      (
        a: {
          name: string | number;
          author: string | number;
          price: string | number;
        },
        b: {
          name: string | number;
          author: string | number;
          price: string | number;
        }
      ) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name':
            return compare(a.name, b.name, isAsc);
          case 'author':
            return compare(a.author, b.author, isAsc);
          case 'price':
            return compare(a.price, b.price, isAsc);
          default:
            return 0;
        }
      }
    );
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
