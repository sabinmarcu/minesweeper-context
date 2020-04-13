import React, { CSSProperties, useContext } from "react";

import Hammer from "react-hammerjs";

import { Box } from "./style";
import { Coordinate, BoxStates, GameStates } from "../../types";
import { useAction } from "../../stores/actions";
import { useBox, useGame } from "../../stores/game";

import { DebugContext } from "../Game";

import HelpOutline from "@material-ui/icons/HelpOutlineOutlined";
import Flag from "@material-ui/icons/FlagOutlined";
import AcUnit from "@material-ui/icons/AcUnitOutlined";

export const BoxComponent: React.FC<{
  coordinate: Coordinate;
  style: CSSProperties;
}> = ({ coordinate, style }) => {
  const debug = useContext(DebugContext);
  const handlers = useAction(coordinate);
  const box = useBox(coordinate);
  const { state } = useGame();
  if (!box) {
    return null;
  }
  return (
    <Hammer {...handlers}>
      <Box
        state={box.state}
        bomb={!!box.bomb}
        style={style}
        debug={debug}
        data-state={box.state}
        gameState={state}
      >
        {(box.state === BoxStates.UNCOVERED &&
          box.neighborCount &&
          box.neighborCount > 0 &&
          box.neighborCount) ||
          (((state === GameStates.ERROR || state === GameStates.SUCCESS) &&
            box.bomb && <AcUnit />) ||
            (box.state === BoxStates.FLAGGED && <Flag />) ||
            (box.state === BoxStates.UNKNOWN && <HelpOutline />))}
      </Box>
    </Hammer>
  );
};

export default BoxComponent;
