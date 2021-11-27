//Book-objektit voi hakea tietokannasta CrudServicen avulla
//myös samalla voi poistaa yhden kirjan delete()-metoodin avulla

import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})


export class BooksListComponent implements OnInit {
  
  Books:any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books =res;
    });    
  }
   //Tämän olen lisännyt itse 
  // Tämä hakee jonkin tietyn tai tietyt kirjat jonkin ehdon perusteella
  searchbook(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books =res;
    });    
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      })
    }
  }

}
