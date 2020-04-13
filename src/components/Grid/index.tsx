import React from "react";
import { BoundingRect } from "react-measure";
import Box from "../Box";
import { useGame } from "../../stores/game";
import { Grid, Nav, Item, Heading } from "./style";
import Refresh from "@material-ui/icons/RefreshOutlined";

export const GridComponent: React.FC<{
  size?: BoundingRect;
  padding?: number;
}> = ({ size, padding = 7 }) => {
  const { size: gameSize, bombsLeft, resetGame } = useGame();
  const { rows, columns } = gameSize;
  if (!size) {
    return null;
  }
  const { width, height } = size;
  const boxSize = Math.max(
    25,
    Math.min(
      50,
      Math.min((width - padding) / columns, (height - padding) / rows) - padding
    )
  );
  const containerWidth = (boxSize + padding) * columns + padding;
  return (
    <>
      <Nav
        style={{
          width: containerWidth
        }}
      >
        <Item />
        <Heading>{bombsLeft}</Heading>
        <Item onClick={resetGame}>
          <Refresh />
        </Item>
      </Nav>
      <Grid
        style={{
          width: containerWidth,
          paddingTop: padding / 2,
          paddingBottom: padding / 2,
          paddingLeft: padding / 2,
          paddingRight: padding / 2
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
                    margin: padding / 2,
                    fontSize: boxSize / 2
                  }}
                />
              ))
          )}
      </Grid>
    </>
  );
};

export default GridComponent;
