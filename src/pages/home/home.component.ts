import { Component } from '@angular/core';
import { TripInputComponent } from '../trip-input/trip-input.component';
import { TripMapComponent } from '../trip-map/trip-map.component';

@Component({
  selector: 'app-home',
  imports: [TripInputComponent, TripMapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'Trip Map';
  constructor() {}
}
