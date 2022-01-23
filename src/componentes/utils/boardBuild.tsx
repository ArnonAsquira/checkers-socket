import { Location } from "../../types/boardTypes";

const amountOfRows = 8;

const quardinatnts: Location[] = [];

for (let i = 0; i < amountOfRows; i++) {
  for (let j = 0; j < amountOfRows; j++) {
    quardinatnts.push([i, j]);
  }
}

const darkTiles: Location[] = quardinatnts.filter(
  (location) => (location[0] + location[1]) % 2 !== 0
);

const initailPlayersLocations: { red: Location[]; blue: Location[] } = {
  red: darkTiles.slice(0, 12),
  blue: darkTiles.slice(20, 32),
};

export { initailPlayersLocations, amountOfRows, quardinatnts };
