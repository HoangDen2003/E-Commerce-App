import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:5000/api";

  private storeTokens(tokens: AuthResponse) {
    if (tokens && tokens.access_token && tokens.refresh_token && tokens.user._id) {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('user_id', tokens.user._id.toString());
    } else {
      console.error('Tokens received from API are invalid:', tokens);
    }
  }

  // login
  login(nameApi: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/${nameApi}/sign-in`;

    const body = {
      email: email,
      password: password
    }

    return this.http.post<any>(url, body)
      .pipe(
        tap(response => {
          console.log('Response received from API:', response); // Log response to debug

          if (response && response.data) {
            this.storeTokens(response.data);
          } else {
            console.error('Invalid response structure:', response);
          }

        }),
        catchError(error => {
            console.error('Error in API call:', error);
            return throwError(error);
        })
      );
  }

  // get all users
  getItems(nameApi: string, limit: number, currentPage: number): Observable<any> {

    const query = new HttpParams()
    .set("limit", limit)
    .set("currentPage", currentPage)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    })

    const url = `${this.apiUrl}${nameApi}`;
    return this.http.get<any>(url, {params: query, headers: headers});
  }

  // create item
  create(nameApi: string, body: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    })

    return this.http.post<any>(`${this.apiUrl}/${nameApi}/create`, body, { headers })

  }

  // delete item
  delete(nameApi: string, ids: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    })

    return this.http.delete<any>(`${this.apiUrl}/${nameApi}/delete`, { body: ids, headers })

  }

}
