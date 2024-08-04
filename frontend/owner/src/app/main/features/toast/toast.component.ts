import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  toastService = inject(ToastService)

}
