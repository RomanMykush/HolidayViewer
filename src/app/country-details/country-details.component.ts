import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CountryService } from '../shared/services/country.service';
import { CountryInfo } from '../shared/models/country-info';
import { NgClass } from '@angular/common';
import { HolidayListComponent } from './holiday-list/holiday-list.component';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [NgClass, HolidayListComponent],
  templateUrl: './country-details.component.html',
})
export class CountryDetailsComponent implements OnInit {
  countryCode: string = '';
  country: CountryInfo | null = null;
  selectedYear: number = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private countryInfoService: CountryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.countryCode = params['code'];
      this.country = null;
      this.selectedYear = new Date().getFullYear();

      this.countryInfoService
        .fetchFullCountryInfo(this.countryCode)
        .subscribe(res => {
          this.country = res;
        });
    });
  }

  range(start: number, end: number): number[] {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start);
  }
}
