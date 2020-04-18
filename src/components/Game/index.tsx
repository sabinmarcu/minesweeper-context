import React, { createContext, useState, useMemo, useEffect } from "react";

import { ThemeProvider } from "emotion-theming";
import Measure, { BoundingRect } from "react-measure";
import { RouteComponentProps } from "react-router-dom";

import Grid from "../Grid";
import { Center } from "../Layout";

import { CombineContexts } from "../../utils/combine";
import { GameProvider } from "../../stores/game";
import { ActionsProvider } from "../../stores/actions";

import { themeLight, theme } from "../../config/theme";

const noop = (e: any): void => {
  e.preventDefault();
  e.stopPropagation();
};

export const DebugContext = createContext<boolean>(false);
export const ThemeSwitchContext = createContext<{
  isDark: boolean;
  toggle: () => void;
}>({
  isDark: true,
  toggle: () => {}
});

export const GameComponent: React.FC<
  RouteComponentProps<{
    rows: string;
    columns: string;
    bombs: string;
    debug?: string;
  }>
> = ({
  match: {
    params: { rows: r, columns: c, bombs: b, debug: d }
  }
}) => {
  const rows = useMemo(() => parseInt(r, 10), [r]);
  const columns = useMemo(() => parseInt(c, 10), [c]);
  const bombs = useMemo(() => parseInt(b, 10), [b]);
  const debug = useMemo(() => !!d, [d]);
  const [size, setSize] = useState<BoundingRect | undefined>();
  const [isDark, setIsDark] = useState<boolean>(true);
  const toggleDarkTheme = (): void => setIsDark(d => !d);
  useEffect(() => {
    document.title = `${columns}x${rows}x${bombs}`;
  }, [columns, rows, bombs]);
  if (!rows || !columns || !bombs) {
    return null;
  }
  return (
    <ThemeSwitchContext.Provider value={{ isDark, toggle: toggleDarkTheme }}>
      <ThemeProvider theme={isDark ? theme : themeLight}>
        <DebugContext.Provider value={debug}>
          <Center onContextMenu={noop}>
            <CombineContexts
              contexts={[
                ActionsProvider,
                [GameProvider, { rows, columns, bombs }]
              ]}
            >
              <Measure bounds onResize={({ bounds }) => setSize(bounds)}>
                {({ measureRef }) => (
                  <Center ref={measureRef}>
                    <Grid {...{ rows, columns, size }} />
                  </Center>
                )}
              </Measure>
            </CombineContexts>
          </Center>
        </DebugContext.Provider>
      </ThemeProvider>
    </ThemeSwitchContext.Provider>
  );
};

export default GameComponent;
