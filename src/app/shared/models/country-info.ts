export class CountryInfo {
  constructor(
    public countryCode: string,
    public commonName: string,
    public officialName: string | null,
    public region: string | null,
    public borders: string[] | null
  ) {}
}
