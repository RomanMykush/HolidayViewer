import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday } from '../models/holiday';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HolidayTypes } from '../enums/holiday-type';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  readonly getAllEndpoint = '/api/v3/PublicHolidays/';
  readonly getAllNextEndpoint = '/api/v3/NextPublicHolidays/';

  constructor(private http: HttpClient) {}

  fetchHolidays(year: number, countryCode: string): Observable<Holiday[]> {
    return this.requestData(
      `${environment.apiUrl}${this.getAllEndpoint}${year}/${countryCode}`
    );
  }

  fetchNextHolidays(countryCode: string): Observable<Holiday[]> {
    return this.requestData(
      `${environment.apiUrl}${this.getAllNextEndpoint}${countryCode}`
    );
  }

  private requestData(url: string): Observable<Holiday[]> {
    return this.http
      .get<
        {
          date: string;
          localName: string;
          name: number;
          countryCode: boolean;
          fixed: boolean;
          global: boolean;
          counties: string[] | null;
          launchYear: number | null;
          types: string[];
        }[]
      >(url)
      .pipe(
        map(res =>
          res.map(
            val =>
              new Holiday(
                new Date(val.date),
                val.localName,
                val.name,
                val.countryCode,
                val.fixed,
                val.global,
                val.counties,
                val.launchYear,
                val.types.map(
                  val => HolidayTypes[val as keyof typeof HolidayTypes]
                )
              )
          )
        )
      );
  }
}
