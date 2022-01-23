interface IndicatorInfo {
  location: Location;
  endangers: Location | null;
}

type Location = [number, number];

export type { Location, IndicatorInfo };
