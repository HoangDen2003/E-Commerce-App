import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

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
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/customer/login`;

    const body = {
      email: email,
      password: password
    }

    return this.http.post<any>(url, body)
      .pipe(
        tap(response => {
          // console.log('Response received from API:', response); // Log response to debug

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
      )
  }

  // get all items
  getData(nameApi: string, limit: number, currentPage: number, tags: string, category: string): Observable<any> {
    let query = new HttpParams()
    .set("limit", limit)
    .set("currentPage", currentPage)
    .set("tags", tags)
    .set("category", category)

    // if (tag) query = query.set("tag", tag)

    // if (body.value) query = query.set(body.key, body.value)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    })

    const url = `${this.apiUrl}${nameApi}`;
    return this.http.get<any>(url, {params: query, headers: headers});
  }

  // get a item
  getProduct(id: string): Observable<any> {

    const body = {
      id: id
    }

    const url = `${this.apiUrl}/products/get`;
    return this.http.post<any>(url, body);
  }

  // get a user
  getUser(): Observable<any> {
    const id = localStorage.getItem("user_id");
    if (!id) return throwError(() => new Error('User ID not found'));
    const params = new HttpParams()
    .set("_id", id)
    const url = `${this.apiUrl}/get-user/${id}`;
    return this.http.get<any>(url, {params: params});
  }

  // add to cart
  create(nameApi: string, body: any): Observable<any> {

    const url = `${this.apiUrl}/${nameApi}/create`;
    return this.http.post<any>(url, body);
  }

  getCart(nameApi: string, uid: string): Observable<any> {
    const query = new HttpParams()
    .set("uid", uid)
    const url = `${this.apiUrl}/${nameApi}/cart`;
    return this.http.get<any>(url, {params: query});
  }

  deleteProductCart(uid: any, upd: any): Observable<any> {
    const body = {
      uid: uid,
      upd: upd
    }
    const url = `${this.apiUrl}/carts/delete-product-cart`;
    return this.http.put<any>(url, body);
  }

  deleteCart(cid: any): Observable<any> {
    const query = new HttpParams()
    .set("_id", cid)
    return this.http.delete<any>(`${this.apiUrl}/carts/delete`, { params: query });
  }

  addWishList(uid: any, pid: any): Observable<any> {
    const body = {
      uid: uid,
      pid: pid
    }
    const url = `${this.apiUrl}/add-wishlist`;
    return this.http.put<any>(url, body);
  } 

  getOrder(): Observable<any> {
    const __OID = localStorage.getItem('order_id')
    if (!__OID) return throwError(() => new Error('Order ID not found'));

    const query = new HttpParams()
    .set("_id", __OID)
    const url = `${this.apiUrl}/orders/getOrder`;

    return this.http.get<any>(url, {params: query});
  }

}
