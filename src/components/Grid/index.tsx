import React from "react";
import { useGame } from "../../stores/game";
import { Grid } from "./style";

export const GridComponent: React.FC = ({ children }) => {
  const { size } = useGame();
  return <Grid {...size}>{children}</Grid>;
};

export default GridComponent;
