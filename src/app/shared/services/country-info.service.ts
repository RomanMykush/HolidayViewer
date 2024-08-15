import { Injectable } from '@angular/core';
import { CountryInfo } from '../models/country-info';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryInfoService {
  countryInfos$ = new BehaviorSubject<CountryInfo[]>([]);

  readonly getAllEndpoint = '/api/v3/AvailableCountries';
  readonly getEndpoint = '/api/v3/CountryInfo/';

  constructor(private http: HttpClient) {
    this.fetchCountryInfos().subscribe(countries => {
      this.countryInfos$.next(countries);
    });
  }

  private fetchCountryInfos(): Observable<CountryInfo[]> {
    return this.http
      .get<
        { countryCode: string; name: string }[]
      >(`${environment.apiUrl}${this.getAllEndpoint}`)
      .pipe(
        map(res => {
          return res.map(c => {
            return new CountryInfo(c.countryCode, c.name, null, null, null);
          });
        })
      );
  }

  fetchFullCountryInfo(countryCode: string): Observable<CountryInfo> {
    return this.http
      .get<{
        countryCode: string;
        commonName: string;
        officialName: string;
        region: string;
        borders: { countryCode: string }[];
      }>(`${environment.apiUrl}${this.getEndpoint}${countryCode}`)
      .pipe(
        map(res => {
          return new CountryInfo(
            res.countryCode,
            res.commonName,
            res.officialName,
            res.region,
            res.borders.map(elem => elem.countryCode)
          );
        })
      );
  }
}
