import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../model/trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-map',
  imports: [CommonModule],
  templateUrl: './trip-map.component.html',
  styleUrl: './trip-map.component.scss',
})
export class TripMapComponent implements OnInit {
  tripGroups: Array<Trip> = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripGroups = this.tripService.getTrips();
  }
}
