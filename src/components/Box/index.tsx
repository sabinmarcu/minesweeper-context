import React from "react";

import { Box } from "./style";
import { Coordinate } from "../../stores/types";
import { useAction } from "../../stores/actions";
import { useBox } from "../../stores/game";

export const BoxComponent: React.FC<{ coordinate: Coordinate }> = ({
  coordinate
}) => {
  const handlers = useAction(coordinate);
  const box = useBox(coordinate);
  const { x, y } = coordinate;
  return <Box id={`${x}:${y}`} {...handlers} box={box} />;
};

export default BoxComponent;
