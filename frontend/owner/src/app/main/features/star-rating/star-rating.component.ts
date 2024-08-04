import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  faStar = faStar

  @Input() rating: number = 0

  // setrating(value: number) {
  //   this.rating = value
  // }

}
