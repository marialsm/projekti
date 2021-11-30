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
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
    //Tämän olen yrittänyt lisätä funktio hakukenttää varten, eli jotta voisi hakea jotakin kirjaa/kirjoja
    //  jonkun ehdon perusteella, mikä ei onnustunut 
  
  SearchBook(): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
         }),
        catchError(this.handleError)
       )
  }

  //Tähän olen yritänyt lisätä funktion, jonka avulla voisi sortata esim. kirjailijoita, mikä ei toimi
    FilterAuthor(): Observable<any> {
      let API_URL = `${this.REST_API}/read-book/'author':1`;
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
