export class LongWeekend {
  constructor(
    public startDate: Date,
    public endDate: Date,
    public dayCount: number,
    public needBridgeDay: boolean
  ) {}
}
