import React, {
  useMemo,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";
import {
  Game,
  Size,
  Box,
  Coordinate,
  GameStates,
  Actions,
  BoxStates
} from "../types";
import { useActions, useResetActions } from "./actions";
import {
  distance,
  indexToCoord,
  neighbors,
  coordToIndex,
  equal
} from "../utils/coords";

const makeArray = (size: number): number[] =>
  new Array(size).fill(0).map((_, index) => index);

export const GameContext = createContext<Game>({
  items: [],
  size: { rows: 0, columns: 0 },
  state: GameStates.INITIAL,
  bombsLeft: 0,
  resetGame: () => {}
});

const handleLeftClick = (
  index: number,
  interactions: { [key: number]: BoxStates },
  size: Size,
  items: Box[]
) => {
  interactions[index] = BoxStates.UNCOVERED;
  const toCheck = [index];
  const checked: number[] = [];
  while (toCheck.length > 0) {
    const idx = toCheck.pop()!;
    if (!(idx in interactions)) {
      interactions[idx] = BoxStates.UNCOVERED;
    }
    const n = neighbors(indexToCoord(idx, size), size)
      .map(it => coordToIndex(it, size))
      .filter(it => !checked.includes(it));
    if (items[idx].neighborCount! === 0) {
      n.forEach(it => toCheck.push(it));
    }
    checked.push(idx);
  }
};

export const GameProvider: React.FC<Size & { bombs: number }> = ({
  rows,
  columns,
  bombs,
  children
}) => {
  const size = useMemo(() => ({ rows, columns }), [rows, columns]);
  const actions = useActions();
  const resetActions = useResetActions();
  const [items, setItems] = useState<Box[]>([]);
  const [state, setState] = useState<GameStates>(GameStates.INITIAL);
  const resetGame = useCallback(() => {
    console.log("❌ Reseting game board");
    resetActions();
    setState(GameStates.INITIAL);
    setItems(
      makeArray(rows)
        .map(row =>
          makeArray(columns).map(column => ({
            coordinate: { x: column, y: row },
            state: BoxStates.COVERED
          }))
        )
        .flat()
    );
  }, [rows, columns, setItems, resetActions]);
  useEffect(() => resetGame(), [resetGame, bombs]);
  const initialized = useMemo(
    () => items.length > 0 && typeof items[0].bomb !== "undefined",
    [items]
  );
  useEffect(() => {
    if ([GameStates.ERROR, GameStates.SUCCESS].includes(state)) {
      return undefined;
    }
    if (actions.length > 0) {
      let newItems = items;
      if (!initialized) {
        console.log("⚙ Generating %d bombs", bombs);
        const bombCoords: number[] = [];
        let count = 0;
        while (count < bombs) {
          let coord;
          do {
            coord = Math.floor(Math.random() * items.length);
          } while (
            bombCoords.includes(coord) ||
            distance(indexToCoord(coord, size), actions[0].coordinate) < 2
          );
          bombCoords.push(coord);
          count++;
        }
        newItems = newItems.map((it, index) => ({
          ...it,
          bomb: bombCoords.includes(index)
        }));
        newItems = newItems.map(it => ({
          ...it,
          neighborCount: neighbors(it.coordinate, size).filter(
            neighbor => !!newItems.find(equal({ coordinate: neighbor! }))!.bomb
          ).length
        }));
      }
      console.log("⚙ Analysing %d actions", actions.length);
      let newState: GameStates = GameStates.ONGOING;
      let interactions: { [key: number]: BoxStates } = {};
      for (const { coordinate, action } of actions) {
        const index = coordToIndex(coordinate, size);
        if (
          action === Actions.LEFT_CLICK &&
          (!(index in interactions) ||
            interactions[index] === BoxStates.COVERED) &&
          items[index].bomb
        ) {
          newState = GameStates.ERROR;
        } else {
          if (
            action === Actions.LEFT_CLICK &&
            (!(index in interactions) ||
              interactions[index] === BoxStates.COVERED)
          ) {
            handleLeftClick(index, interactions, size, items);
          } else if (
            action === Actions.RIGHT_CLICK &&
            (!(index in interactions) ||
              interactions[index] !== BoxStates.UNCOVERED)
          ) {
            interactions[index] = (() => {
              switch (interactions[index]) {
                case BoxStates.COVERED:
                  return BoxStates.FLAGGED;
                case BoxStates.FLAGGED:
                  return BoxStates.UNKNOWN;
                case BoxStates.UNKNOWN:
                  return BoxStates.COVERED;
                default:
                  return BoxStates.FLAGGED;
              }
            })();
          } else if (
            action === Actions.DBL_CLICK &&
            (index in interactions &&
              interactions[index] === BoxStates.UNCOVERED)
          ) {
            const n = neighbors(indexToCoord(index, size), size).map(it =>
              coordToIndex(it, size)
            );
            const flagged = n.filter(
              it => interactions[it] === BoxStates.FLAGGED
            );
            const covered = n.filter(
              it => !interactions[it] || interactions[it] === BoxStates.COVERED
            );
            const bombs = n.filter(it => items[it].bomb);
            if (flagged.length === items[index].neighborCount) {
              if (bombs.length > 0) {
                newState = GameStates.ERROR;
              } else {
                covered.forEach(it =>
                  handleLeftClick(it, interactions, size, items)
                );
              }
            }
          }
        }
      }
      if (newState !== GameStates.ERROR) {
        const actionedItems = newItems.map((it, index) =>
          index in interactions && it.state !== interactions[index]
            ? { ...it, state: interactions[index] }
            : it
        );
        setItems(
          newItems.filter((i, index) => i.state !== actionedItems[index].state)
            .length > 0
            ? actionedItems
            : newItems
        );
      }
      setState(newState);
    }
  }, [setItems, actions, bombs, size, initialized, items, setState, state]);
  const notBombs = useMemo(
    () =>
      items.filter(({ state }) =>
        [BoxStates.UNCOVERED, BoxStates.UNKNOWN].includes(state)
      ).length,
    [items]
  );
  useEffect(() => {
    if (notBombs === size.rows * size.columns - bombs) {
      setState(GameStates.SUCCESS);
    }
  }, [notBombs, size, setState, bombs]);
  const bombsLeft = useMemo(
    () =>
      bombs - items.filter(({ state }) => state === BoxStates.FLAGGED).length,
    [bombs, items]
  );
  return (
    <GameContext.Provider value={{ items, size, state, bombsLeft, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export const useBox = (coordinate: Coordinate) => {
  const { items } = useGame();
  const box = useMemo(() => items.find(equal({ coordinate })), [
    items,
    coordinate
  ]);
  return box;
};
