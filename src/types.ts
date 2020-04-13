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
  state: BoxStates;
  neighborCount?: number;
};

export type Game = {
  items: Box[];
  size: Size;
  state: GameStates;
};

export enum Actions {
  LEFT_CLICK,
  RIGHT_CLICK,
  DBL_CLICK
}

export type Action = {
  action: Actions;
  coordinate: Coordinate;
};

export enum GameStates {
  INITIAL,
  ONGOING,
  SUCCESS,
  ERROR
}

export enum BoxStates {
  COVERED,
  UNCOVERED,
  FLAGGED,
  UNKNOWN
}
