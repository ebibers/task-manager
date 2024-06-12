import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'server-error',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  constructor(private location : Location) {}

  goBack() {
    this.location.back();
  }
}