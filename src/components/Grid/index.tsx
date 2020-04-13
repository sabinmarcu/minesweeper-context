import React from "react";
import { BoundingRect } from "react-measure";
import Box from "../Box";
import { useGame } from "../../stores/game";
import { Grid } from "./style";

export const GridComponent: React.FC<{
  size?: BoundingRect;
  padding?: number;
}> = ({ size, padding = 10 }) => {
  const { size: gameSize } = useGame();
  const { rows, columns } = gameSize;
  if (!size) {
    return null;
  }
  const { width, height } = size;
  const boxSize = Math.max(
    25,
    Math.min(50, Math.min(width / columns, height / rows) - padding)
  );
  const containerWidth = (boxSize + padding) * columns;
  return (
    <Grid
      style={{
        width: containerWidth,
        paddingTop: padding / 2,
        paddingBottom: padding / 2
      }}
    >
      {new Array(rows)
        .fill(0)
        .map((it, index) => index)
        .map(row =>
          new Array(columns)
            .fill(0)
            .map((it, index) => index)
            .map(column => (
              <Box
                key={`${row}:${column}`}
                coordinate={{ y: row, x: column }}
                style={{
                  width: boxSize,
                  height: boxSize,
                  margin: padding / 2
                }}
              />
            ))
        )}
    </Grid>
  );
};

export default GridComponent;
