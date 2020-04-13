export type Coordinate = {
  x: number;
  y: number;
};

export type Size = {
  rows: number;
  columns: number;
};

export type Box = {
  coordinate: Coordinate;
  bomb?: boolean;
};

export type Game = {
  items: Box[];
  size: Size;
};

export enum Actions {
  LEFT_CLICK,
  RIGHT_CLICK
}

export type Action = {
  action: Actions;
  coordinate: Coordinate;
};
