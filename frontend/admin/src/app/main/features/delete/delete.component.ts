import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ApiService } from '../../shared/rest-api/api.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  isSuccess: boolean = false;
  isFailed: boolean = false;

  constructor(private http: ApiService) { 
    this.isSuccess = false;
    this.isFailed = false;
  }

  @Input() isDelete: boolean = false;
  @Input() url: string = "";
  @Input() ids: any[] = [];
  @Input() checkedAll: any[] = [];
  @Output() close = new EventEmitter();


  closeDialog(): void {
    this.close.emit();
  }

  onSuccess() {

    // ! FIX
    if (this.ids.length > 0) {
      const id = {
        ids: this.ids
      }

      this.http.delete(this.url, id).subscribe({
        next: (data: any) => {
          this.isSuccess = true;
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
     if(this.checkedAll.length > 0) {
      const id = {
        ids: this.checkedAll
      }
      this.http.delete(this.url, id).subscribe({
        next: (data: any) => {
          this.isSuccess = true;
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
  }

  onFailed() {
    this.isFailed = true;
  }

}
