import { Injectable } from '@angular/core';
import { Book } from './Book';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudService {


  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  searchOption: any;



  constructor(private httpClient: HttpClient) { }

  // Add
  AddBook(data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  GetBooks() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  GetBook(id:any): Observable<any> {
	console.error("foo1");
    let API_URL = `${this.REST_API}/read-book/${id}`;
	console.log("foo2");
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

   //Tämän olen lisännyt itse 
    // Hae jokin tietty tai tietyt kirjat jonkun ehdon perusteella
    GetSomeBooks(txt:any): Observable<any> {
	  console.log('*** GetSomeBooks:' + txt);
      let API_URL = `${this.REST_API}/read-books/${txt}`;
      //let API_URL = `${this.REST_API}/read-books/b`;
	  console.log('*** GetSomeBooks API_URL:' + API_URL);
      return this.httpClient.get(API_URL, { headers: this.httpHeaders })
        .pipe(map((res: any) => {
            return res || {}
          }),
          catchError(this.handleError)
        )
    }


  // Update
  updateBook(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteBook(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }


  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
