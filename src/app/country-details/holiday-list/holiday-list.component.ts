import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Holiday } from '../../shared/models/holiday';
import { HolidayService } from '../../shared/services/holiday.service';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HolidayTypeIconComponent } from './holiday-type-icon/holiday-type-icon.component';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [DatePipe, MatTableModule, HolidayTypeIconComponent],
  templateUrl: './holiday-list.component.html',
})
export class HolidayListComponent implements OnChanges {
  @Input() year: number = new Date().getFullYear();
  @Input() countryCode: string = '';

  displayedColumns: string[] = ['name', 'localName', 'date', 'types'];
  holidays: Holiday[] = [];

  constructor(private holidayService: HolidayService) {}

  ngOnChanges(_: SimpleChanges) {
    this.updateHolidays();
  }

  updateHolidays() {
    this.holidayService
      .fetchHolidays(this.year, this.countryCode)
      .subscribe(res => (this.holidays = res));
  }
}
