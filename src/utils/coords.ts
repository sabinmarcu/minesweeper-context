import { Coordinate, Size } from "../stores/types";

export const distance = (a: Coordinate, b: Coordinate) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

export const indexToCoord = (index: number, { columns }: Size): Coordinate => ({
  x: index % columns,
  y: Math.floor(index / columns)
});
