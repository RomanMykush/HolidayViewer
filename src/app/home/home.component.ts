import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NextHolidayComponent } from './next-holiday/next-holiday.component';
import { CountryService } from '../shared/services/country.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, NextHolidayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  countryCodes: string[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.countryInfos$.subscribe(res => {
      const array = this.shuffle(res);
      this.countryCodes = array.slice(0, 3).map(c => c.countryCode);
    });
  }

  shuffle<T>(array: T[]): T[] {
    const shuffledArray = array.slice();
    let currentIndex = shuffledArray.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }
    return shuffledArray;
  }
}
