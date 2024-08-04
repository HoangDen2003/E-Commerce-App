import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/main/shared/rest-api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: ApiService) { }

  delete(id: string) {
    this.http.delete('categories', id).subscribe({
      next: (data: any) => {
        // console.log(data)
      },
      error: (error: any) => {
        console.log(error)
      },
    })
  }

}
