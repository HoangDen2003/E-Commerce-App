import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent {
  
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input() limit: number = 9;
  @Input() pages: number = 1
  @Input() currentPage: number = 1
  @Output() currentPageChange = new EventEmitter<number>()
  subPages: number[] = []

  private uploadUrl(): void {
      const queryParams: any = {
        currentPage: this.currentPage,
        limit: this.limit,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
  }

  ngOnInit(): void {
    this.currentPage = Number(this.currentPage);
    this.limit = Number(this.limit);
    this.uploadUrl()
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['search']) {
  //     this.search = changes['search'].currentValue
  //     this.uploadUrl()
  //   }
  // }

  onPageChange(currentPage: any) {
    this.currentPageChange.emit(currentPage);
    this.currentPage = currentPage;
    this.uploadUrl();
  }

  checkExitsPage(page: number): boolean {
    return this.subPages.includes(page)
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

}
