import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../model/trip';
interface TripRender {
  start: string;
  end: string;
  level: number;
  hasArrow: boolean;
  count: number;
}
@Component({
  selector: 'app-trip-map',
  imports: [CommonModule],
  templateUrl: './trip-map.component.html',
  styleUrls: ['./trip-map.component.scss'],
})
export class TripMapComponent implements OnInit {
  renderedTrips: TripRender[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.trips$.subscribe((trips: Trip[]) => {
      this.renderedTrips = this.processTrips(trips);
    });
  }

  processTrips(trips: Trip[]): TripRender[] {
    const rendered: TripRender[] = [];
    let i = 0;

    while (i < trips.length) {
      const current = trips[i];
      let count = 1;
      while (
        i + count < trips.length &&
        trips[i + count].start === current.start &&
        trips[i + count].end === current.end
      ) {
        count++;
      }
      const prev = rendered.length > 0 ? rendered[rendered.length - 1] : null;
      let level = 1;
      let hasArrow = true;

      if (count > 1) {
        level = 2;
        hasArrow = false;
      } else if (prev && prev.end === current.start) {
        level = 1;
        hasArrow = false;
        if (prev.level === 1) {
          prev.hasArrow = false;
        }
      } else {
        level = 1;
        hasArrow = true;
      }
      rendered.push({
        start: current.start,
        end: current.end,
        level,
        hasArrow,
        count,
      });

      i += count;
    }

    return rendered;
  }
}
