import styled from '@emotion/styled';
import Color from 'color';
import { BoxStates, GameStates } from '../../types';
import { ThemeType } from '../../config/theme';

const getDebugColor = (
  bomb: boolean,
  debug: boolean,
  theme: ThemeType,
) => (debug ? (bomb ? 'red' : 'blue') : theme.backgroundDark || 'black');

const getColor = (
  state: BoxStates,
  gameState: GameStates,
  neighbors: number | undefined,
  theme: ThemeType,
) => {
  const defaultColor = new Color(theme.background).isLight()
    ? 'black'
    : 'white';
  if ([GameStates.SUCCESS, GameStates.ERROR].includes(gameState)) {
    return 'white';
  }
  if (state === BoxStates.UNCOVERED) {
    return theme[((): keyof ThemeType => {
      switch (neighbors) {
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        case 4: return 'four';
        case 5: return 'five';
        case 6: return 'six';
        case 7: return 'seven';
        case 8: return 'eight';
        default: return 'unknown';
      }
    })()];
  }
  return defaultColor;
};

const getErrorColors = (gameState: GameStates, bomb: boolean) => {
  if (gameState === GameStates.ERROR) {
    if (bomb) {
      return 'red';
    }
    return 'darkred';
  }
  if (gameState === GameStates.SUCCESS) {
    if (bomb) {
      return 'green';
    }
    return 'darkgreen';
  }
  return null;
};

const getBackground = (
  bomb: boolean,
  debug: boolean,
  state: BoxStates,
  gameState: GameStates,
  theme: ThemeType,
) => {
  const gameStateColor = getErrorColors(gameState, bomb);
  if (gameStateColor) {
    return gameStateColor;
  }
  if (state === BoxStates.UNCOVERED) {
    return theme.backgroundLight;
  }
  return getDebugColor(bomb, debug, theme);
};

export const Box = styled.div<{
  state: BoxStates;
  bomb: boolean;
  debug?: boolean;
  gameState: GameStates;
  neighbors: number | undefined;
  theme: ThemeType;
}>(
  `
    position: relative;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: motion;
    cursor: pointer;
    border-radius: 2px;
  `,
  ({
    state,
    bomb,
    debug = false,
    gameState,
    neighbors,
    theme,
  }) => ({
    color: getColor(state, gameState, neighbors, theme),
    background: getBackground(bomb, debug, state, gameState, theme),
    boxShadow: state !== BoxStates.UNCOVERED
      ? `inset 0px -1px 2px ${new Color(theme.background).isLight() ? 'white' : 'black'}`
      : '',
  }),
);

export default Box;
