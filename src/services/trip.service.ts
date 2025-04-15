import { Injectable } from '@angular/core';
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor() {}
  trips: Trip[] = [];
  tripGroups: Array<Array<Trip>> = [];
  locations = ['Bangalore', 'Chennai', 'Ooty', 'Hyderabad', 'Mumbai'];
  addTrip(trip: { start: string; end: string }) {
    const lastTrip = this.trips[this.trips.length - 1];
    const isDuplicateTrip = this.trips.some(
      (existingTrip) =>
        existingTrip.start === trip.start && existingTrip.end === trip.end
    );
    if (isDuplicateTrip) {
      lastTrip.level = 2;
    } else if (lastTrip) {
      if (lastTrip.end === trip.start) {
        if (!lastTrip.intermediate) {
          lastTrip.intermediate = [];
        }
        lastTrip?.intermediate.push(trip.start);
        lastTrip.end = trip.end;
      } else if (lastTrip.start === trip.end) {
        this.trips.push({ ...trip, level: 1, isArrow: true });
      } else {
        this.trips.push({ ...trip, level: 1, isArrow: false });
      }
    } else {
      this.trips.push({ ...trip, level: 1, isArrow: false });
    }
  }

  getTrips() {
    return this.trips;
  }

  getLocations() {
    return this.locations;
  }
}
