import { Injectable } from '@angular/core';
import { CountryInfo } from '../models/country-info';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countryInfos$ = new BehaviorSubject<Country[]>([]);

  readonly getAllEndpoint = '/api/v3/AvailableCountries';
  readonly getEndpoint = '/api/v3/CountryInfo/';

  constructor(private http: HttpClient) {
    this.fetchCountryInfos().subscribe(countries => {
      this.countryInfos$.next(countries);
    });
  }

  private fetchCountryInfos(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${environment.apiUrl}${this.getAllEndpoint}`
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
