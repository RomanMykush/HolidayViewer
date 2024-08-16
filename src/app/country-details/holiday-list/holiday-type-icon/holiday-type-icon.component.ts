import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HolidayTypes } from '../../../shared/enums/holiday-type';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-holiday-type-icon',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './holiday-type-icon.component.html',
})
export class HolidayTypeIconComponent {
  @Input() type: HolidayTypes | null = null;

  public holidayTypes = HolidayTypes;
}
