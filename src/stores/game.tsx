import React, {
  useMemo,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { Game, Size, Box, Coordinate } from "./types";
import { useActions } from "./actions";
import { distance, indexToCoord } from "../utils/coords";

const makeArray = (size: number): number[] =>
  new Array(size).fill(0).map((_, index) => index);

export const GameContext = createContext<Game>({
  items: [],
  size: { rows: 0, columns: 0 }
});

export const GameProvider: React.FC<Size & { bombs: number }> = ({
  rows,
  columns,
  bombs,
  children
}) => {
  const size = useMemo(() => ({ rows, columns }), [rows, columns]);
  const actions = useActions();
  const [items, setItems] = useState<Box[]>([]);
  useEffect(() => {
    setItems(
      makeArray(rows)
        .map(row =>
          makeArray(columns).map(column => ({
            coordinate: { x: column, y: row }
          }))
        )
        .flat()
    );
  }, [rows, columns]);
  const initialized = useMemo(
    () => items.length > 0 && typeof items[0].bomb !== "undefined",
    [items]
  );
  useEffect(() => {
    if (!initialized && actions.length > 0) {
      console.log("⚙️ Generating %d bombs", bombs);
      const bombCoords: number[] = [];
      let count = 0;
      while (count < bombs) {
        console.log("Generating bomb %d", count);
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
      setItems(
        items.map((it, index) => ({
          ...it,
          bomb: bombCoords.includes(index)
        }))
      );
    }
  }, [setItems, actions, bombs, size]);
  return (
    <GameContext.Provider value={{ items, size }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export const useBox = (coordinate: Coordinate) => {
  const { items } = useGame();
  const box = items.find(
    ({ coordinate: c }) => c.x === coordinate.x && c.y === coordinate.y
  );
  return box;
};
