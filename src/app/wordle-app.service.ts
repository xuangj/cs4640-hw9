import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordleAppService {
  private apiUrl = 'https://cs4640.cs.virginia.edu/yyf2uf/hw9/wordle_api.php';

  constructor(private http: HttpClient) {}
  getRandomWord(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
