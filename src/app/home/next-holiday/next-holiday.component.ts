import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../../shared/services/country.service';
import { CountryInfo } from '../../shared/models/country-info';
import { HolidayService } from '../../shared/services/holiday.service';
import { Holiday } from '../../shared/models/holiday';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-next-holiday',
  standalone: true,
  imports: [MatCardModule, DatePipe, RouterModule],
  templateUrl: './next-holiday.component.html',
})
export class NextHolidayComponent implements OnInit {
  @Input() countryCode: string = '';

  country: CountryInfo | null = null;
  holiday: Holiday | null = null;

  constructor(
    private countryService: CountryService,
    private holidayService: HolidayService
  ) {}

  ngOnInit() {
    this.countryService
      .fetchFullCountryInfo(this.countryCode)
      .subscribe(res => (this.country = res));

    this.holidayService
      .fetchNextHolidays(this.countryCode)
      .subscribe(res => (this.holiday = res[0]));
  }
}
