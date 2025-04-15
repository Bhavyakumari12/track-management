import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-input',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './trip-input.component.html',
  styleUrl: './trip-input.component.scss',
})
export class TripInputComponent implements OnInit {
  tripForm!: FormGroup;
  locations: string[] = [];
  startPoint = '';
  endPoint = '';
  constructor(private tripService: TripService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.locations = this.tripService.getLocations();
    this.tripForm = this.fb.group({
      startPoint: [this.startPoint, Validators.required],
      endPoint: [this.endPoint, Validators.required],
    });
  }

  addTrip(): boolean {
    this.tripForm.markAllAsTouched();
    this.tripForm.markAsDirty();

    if (this.tripForm.invalid) {
      return false;
    }
    const tripCode = {
      start: this.tripForm.value.startPoint.slice(0, 3).toUpperCase(),
      end: this.tripForm.value.endPoint.slice(0, 3).toUpperCase(),
    };
    this.tripService.addTrip(tripCode);
    this.tripForm.reset();

    return true;
  }
}
