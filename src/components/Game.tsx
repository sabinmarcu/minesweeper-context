import React, { createContext, useState, useMemo } from "react";
import Measure, { BoundingRect } from "react-measure";

import Grid from "./Grid";
import { Center } from "./Layout";

import { CombineContexts } from "./../utils/combine";
import { GameProvider, GameContext } from "./../stores/game";
import { ActionsProvider } from "./../stores/actions";
import { RouteComponentProps } from "react-router-dom";

export const DebugContext = createContext<boolean>(false);

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
  if (!rows || !columns || !bombs) {
    return null;
  }
  return (
    <DebugContext.Provider value={debug}>
      <Center>
        <CombineContexts
          contexts={[ActionsProvider, [GameProvider, { rows, columns, bombs }]]}
        >
          <Measure bounds onResize={({ bounds }) => setSize(bounds)}>
            {({ measureRef }) => (
              <Center ref={measureRef}>
                <GameContext.Consumer>
                  {({ bombsLeft }) => (
                    <h1 style={{ textAlign: "center" }}>{bombsLeft}</h1>
                  )}
                </GameContext.Consumer>
                <Grid {...{ rows, columns, size }} />
              </Center>
            )}
          </Measure>
        </CombineContexts>
      </Center>
    </DebugContext.Provider>
  );
};

export default GameComponent;
