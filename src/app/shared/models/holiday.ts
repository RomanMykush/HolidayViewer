import { HolidayTypes } from '../enums/holiday-type';

export class Holiday {
  constructor(
    public date: Date,
    public localName: string,
    public name: number,
    public countryCode: boolean,
    public fixed: boolean,
    public global: boolean,
    public counties: string[] | null,
    public launchYear: number | null,
    public types: HolidayTypes[]
  ) {}
}
