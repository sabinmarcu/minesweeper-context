import styled from "@emotion/styled";
import { BoxStates, GameStates } from "../../types";

const getDebugColor = (bomb: boolean, debug: boolean) =>
  debug ? (bomb ? "red" : "blue") : "black";

const getColor = (state: BoxStates, gameState: GameStates) => {
  if ([GameStates.SUCCESS, GameStates.ERROR].includes(gameState)) {
    return "white";
  }
  if (state === BoxStates.UNCOVERED) {
    return "black";
  }
  return "white";
};

const getErrorColors = (gameState: GameStates, bomb: boolean) => {
  if (gameState === GameStates.ERROR) {
    if (bomb) {
      return "red";
    }
    return "darkred";
  }
  if (gameState === GameStates.SUCCESS) {
    if (bomb) {
      return "green";
    }
    return "darkgreen";
  }
  return null;
};

const getBackground = (
  bomb: boolean,
  debug: boolean,
  state: BoxStates,
  gameState: GameStates
) => {
  const gameStateColor = getErrorColors(gameState, bomb);
  if (gameStateColor) {
    return gameStateColor;
  }
  if (state === BoxStates.UNCOVERED) {
    return "white";
  }
  return getDebugColor(bomb, debug);
};

const getBorder = (bomb: boolean, debug: boolean, gameState: GameStates) => {
  const gameStateColor = getErrorColors(gameState, bomb);
  if (gameStateColor) {
    return gameStateColor;
  }
  return getDebugColor(bomb, debug);
};

export const Box = styled.div<{
  state: BoxStates;
  bomb: boolean;
  debug?: boolean;
  gameState: GameStates;
}>(
  `
    position: relative;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: motion;
  `,
  ({ state, bomb, debug = false, gameState }) => ({
    cursor: state !== BoxStates.UNCOVERED ? "pointer" : "initial",
    color: getColor(state, gameState),
    background: getBackground(bomb, debug, state, gameState),
    border: ["solid", "2px", getBorder(bomb, debug, gameState)].join(" ")
  })
);

export default Box;
