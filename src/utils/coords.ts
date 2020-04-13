import { Coordinate, Size } from "../types";

export const distance = (a: Coordinate, b: Coordinate) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

export const indexToCoord = (index: number, { columns }: Size): Coordinate => ({
  x: index % columns,
  y: Math.floor(index / columns)
});

export const coordToIndex = (coord: Coordinate, { columns }: Size): number =>
  coord.y * columns + coord.x;

export const neighbors = (
  { x, y }: Coordinate,
  { rows, columns }: Size
): Coordinate[] => {
  const coords = [
    { x: x - 1, y: y - 1 },
    { x: x - 1, y },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y },
    { x: x + 1, y: y + 1 },
    { x, y: y - 1 },
    { x, y: y + 1 }
  ];
  return coords.filter(
    ({ x: cx, y: cy }) => cx >= 0 && cx < columns && cy >= 0 && cy < rows
  );
};

export const equal = ({ coordinate: a }: { coordinate: Coordinate }) => ({
  coordinate: b
}: {
  coordinate: Coordinate;
}) => a.x === b.x && a.y === b.y;
