import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CountryInfoService } from '../../shared/services/country-info.service';
import { Country } from '../../shared/models/country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  inputControl = new FormControl<string | Country>('');
  options: Country[] = [];
  filteredOptions$ = new Observable<Country[]>();

  constructor(
    private countryInfoService: CountryInfoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.countryInfoService.countryInfos$.subscribe(
      countries => (this.options = countries)
    );

    // Listen for country selection
    this.inputControl.valueChanges.subscribe(value => {
      if (typeof value === 'object') {
        const country = value as Country;
        this.router.navigate(['/countries', country.countryCode]);
      }
    });

    // Update filtered options
    this.filteredOptions$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this.filterCountries(name as string)
          : this.options.slice();
      })
    );
  }

  displayFn(country: Country): string {
    return country ? country.name : '';
  }

  private filterCountries(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
