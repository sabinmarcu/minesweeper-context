import React, { createContext, useState } from "react";
import Measure, { BoundingRect } from "react-measure";

import Grid from "./Grid";
import { Center } from "./Layout";

import { CombineContexts } from "./../utils/combine";
import { GameProvider } from "./../stores/game";
import { ActionsProvider } from "./../stores/actions";

export const DebugContext = createContext<boolean>(false);

export const GameComponent: React.FC<{
  rows: number;
  columns: number;
  bombs: number;
  debug?: boolean;
}> = ({ rows, columns, bombs, debug = false }) => {
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
