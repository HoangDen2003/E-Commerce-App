import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {
  @Input() currentPage: number = 1
  @Input() pages: number = 1
  @Input() limit: number = 1
  @Input() itemsLength: number = 1
  @Output() currentPageChange = new EventEmitter<number>()
  subPages: number[] = []

  ngOnInit(): void {
    this.currentPage = Number(this.currentPage);
    this.limit = Number(this.limit);
  }

  getDisplayPages(): (number | string)[] {
    const displayPages: (number | string)[] = [];

    if (this.pages <= 2) {
      // Hiển thị tất cả các trang nếu số trang nhỏ hơn hoặc bằng 2
      for (let i = 1; i <= this.pages; i++) {
        displayPages.push(i);
      }
    } else {
      // Hiển thị trang đầu, trang cuối và ...
      if (this.currentPage > 1) {
        displayPages.push(1);
        if (this.currentPage > 2) {
          displayPages.push('...');
        }
      }

      displayPages.push(this.currentPage);

      if (this.currentPage < this.pages) {
        if (this.currentPage < this.pages - 1) {
          displayPages.push('...');
        }
        displayPages.push(this.pages);
      }
    }
    return displayPages;
  }

  onPageChange(currentPage: any) {
    this.currentPageChange.emit(currentPage);
    this.currentPage = currentPage;
  }

  checkExitsPage(page: number): boolean {
    return this.subPages.includes(page)
  }
  
}
