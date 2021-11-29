import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Book {
  _id: string,
  name: string;
  author: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ang-pro';
  searchText = '';
  searchTerm: string | any;
  searchBooks: Book[] | any;
  allBooks: Book[] | any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Book[]>('./service/Book')
      .subscribe((data: Book[]) => {
        this.searchBooks = data;
        this.allBooks = this.searchBooks;
      });
  }

  searchMBooks(value: string): void {
    this.searchBooks = this.allBooks.filter((val: { name: string; }) => val.name.toLowerCase().includes(value));
  }

}


