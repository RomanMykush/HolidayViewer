export class CountryInfo {
  constructor(
    public countryCode: string,
    public commonName: string,
    public officialName: string,
    public region: string,
    public borders: string[]
  ) {}
}
