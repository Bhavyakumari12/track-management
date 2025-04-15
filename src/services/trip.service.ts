import { Injectable } from '@angular/core';
import { Trip } from '../model/trip';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  trips$ = this.tripsSubject.asObservable();

  locations = ['Bangalore', 'Chennai', 'Ooty', 'Hyderabad', 'Mumbai'];

  addTrip(trip: Trip) {
    const current = this.tripsSubject.getValue();
    this.tripsSubject.next([...current, trip]);
  }

  getLocations() {
    return this.locations;
  }
}
